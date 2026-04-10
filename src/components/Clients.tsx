'use client';

import React, { useRef, useEffect, useState, useCallback, memo } from 'react';
import * as d3 from 'd3';
import { Reveal, TerminalHeader } from './shared';
import type { Client, LocalizedString } from '@/lib/types';

/* ─── types ─── */
interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: 'company' | 'project';
  radius: number;
  parentId?: string;
  logo?: string | null;
  link?: string | null;
  role?: string;
  description?: string;
  initial: string;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
}

interface TooltipData {
  x: number;
  y: number;
  label: string;
  role?: string;
  description?: string;
  link?: string | null;
  logo?: string | null;
}

interface ClientsProps {
  clients: Client[];
  t: (s: LocalizedString) => string;
}

/* ─── module-level constants ─── */
const MAX_LABEL_LEN = 16;

const PULSE_RING_CSS = `
  @keyframes pulse-ring {
    0%   { transform: scale(1);    opacity: 0.5;  }
    50%  { transform: scale(1.12); opacity: 0.18; }
    100% { transform: scale(1);    opacity: 0.5;  }
  }
  .pulse-ring {
    animation: pulse-ring 2.5s ease-in-out infinite;
    transform-origin: center;
    transform-box: fill-box;
  }
`;

/* ─── helpers ─── */
function buildGraph(clients: Client[], t: (s: LocalizedString) => string) {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  clients.forEach((client) => {
    nodes.push({
      id: client.id,
      label: client.name,
      type: 'company',
      radius: 40,
      logo: client.logo,
      link: client.link,
      role: client.role ? t(client.role) : undefined,
      description: t(client.description),
      initial: client.name.charAt(0).toUpperCase(),
    });

    client.projects.forEach((proj, pi) => {
      const projId = `${client.id}-p${pi}`;
      nodes.push({
        id: projId,
        label: t(proj.name),
        type: 'project',
        radius: 20,
        parentId: client.id,
        role: proj.role ? t(proj.role) : undefined,
        description: t(proj.description),
        link: proj.link,
        logo: proj.logo,
        initial: t(proj.name).charAt(0).toUpperCase(),
      });
      links.push({ source: client.id, target: projId });
    });
  });

  return { nodes, links };
}

function getColors(isDark: boolean) {
  return {
    companyFill:    isDark ? '#18181b' : '#fafafa',
    companyStroke:  isDark ? '#3f3f46' : '#d4d4d8',
    projectFill:    isDark ? '#27272a' : '#f4f4f5',
    projectStroke:  isDark ? '#3f3f46' : '#d4d4d8',
    hoverStroke:    '#22d3ee',
    linkStroke:     isDark ? 'rgba(63,63,70,0.5)'    : 'rgba(212,212,216,0.6)',
    linkStrokeHover:isDark ? 'rgba(34,211,238,0.4)'  : 'rgba(34,211,238,0.5)',
    labelColor:     isDark ? '#a1a1aa' : '#71717a',
    labelColorHover:'#22d3ee',
    initialColor:   isDark ? '#52525b' : '#a1a1aa',
  };
}

/**
 * Adds logo image with initial-letter fallback inside a D3 node group.
 * Shared between company and project nodes (DRY).
 */
function addNodeContent(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: d3.Selection<SVGGElement, any, any, any>,
  d: GraphNode,
  initialColor: string,
) {
  const pad = d.type === 'company' ? 4 : 2;
  const imgSize = (d.radius - pad) * 2;

  const fallback = node.append('text')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .attr('font-family', 'monospace')
    .attr('font-size', d.radius * (d.type === 'company' ? 0.7 : 0.6))
    .attr('font-weight', d.type === 'company' ? 'bold' : 'normal')
    .attr('fill', initialColor)
    .attr('class', 'fallback-initial')
    .text(d.initial);

  if (!d.logo) return;

  node.append('image')
    .attr('href', d.logo)
    .attr('x', -imgSize / 2)
    .attr('y', -imgSize / 2)
    .attr('width', imgSize)
    .attr('height', imgSize)
    .attr('clip-path', `url(#clip-${d.id})`)
    .attr('class', 'logo-img')
    .attr('preserveAspectRatio', 'xMidYMid slice')
    .on('load', () => fallback.attr('opacity', 0))
    .on('error', function () {
      d3.select(this as SVGImageElement).remove();
      fallback.attr('opacity', 1);
    });
}

/* ─── NodeTooltip ─── */
interface NodeTooltipProps { tooltip: TooltipData }

const NodeTooltip = memo(function NodeTooltip({ tooltip }: NodeTooltipProps) {
  return (
    <div
      className="pointer-events-none fixed z-50 max-w-xs rounded-lg border border-zinc-700/80 bg-zinc-900/95 px-4 py-3 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm"
      style={{ left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, -100%)' }}
    >
      {tooltip.logo && (
        <div className="mb-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tooltip.logo} alt={tooltip.label} className="w-8 h-8 rounded object-contain bg-zinc-800 p-0.5" />
        </div>
      )}
      <p className="font-mono text-xs font-semibold text-cyan-400">
        <span className="text-green-500">{'>'}</span> {tooltip.label}
      </p>
      {tooltip.role && (
        <p className="mt-1 font-mono text-[10px] text-zinc-500">
          {'// '}{tooltip.role}
        </p>
      )}
      {tooltip.description && (
        <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-zinc-400">
          {tooltip.description}
        </p>
      )}
      {tooltip.link && (
        <div className="mt-2.5 pt-2 border-t border-zinc-700/50">
          <span className="font-mono text-[10px] text-green-400/80">
            {'\u2197'} {tooltip.link.replace(/^https?:\/\//, '')}
          </span>
        </div>
      )}
      <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-zinc-700/80 bg-zinc-900/95" />
    </div>
  );
});

/* ─── component ─── */
function ClientsInner({ clients, t }: ClientsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<d3.Simulation<GraphNode, GraphLink> | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const tooltipTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const showTooltip = useCallback((data: TooltipData) => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    setTooltip(data);
  }, []);

  const hideTooltip = useCallback(() => {
    tooltipTimeout.current = setTimeout(() => setTooltip(null), 120);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const colors = getColors(isDark);
    const { nodes, links } = buildGraph(clients, t);

    const width = container.clientWidth;
    const height = Math.max(420, Math.min(560, width * 0.55));

    const d3Svg = d3.select(svg)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`);

    d3Svg.selectAll('*').remove();

    // defs: glow filter + clip paths for all nodes
    const defs = d3Svg.append('defs');

    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%').attr('y', '-50%')
      .attr('width', '200%').attr('height', '200%');
    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'blur');
    filter.append('feMerge')
      .selectAll('feMergeNode')
      .data(['blur', 'SourceGraphic'])
      .join('feMergeNode')
      .attr('in', (d) => d);

    nodes.forEach((n) => {
      const pad = n.type === 'company' ? 4 : 2;
      defs.append('clipPath')
        .attr('id', `clip-${n.id}`)
        .append('circle')
        .attr('r', n.radius - pad);
    });

    // dot-grid background
    const patternSize = 32;
    const gridPattern = defs.append('pattern')
      .attr('id', 'grid-dots')
      .attr('width', patternSize).attr('height', patternSize)
      .attr('patternUnits', 'userSpaceOnUse');
    gridPattern.append('circle')
      .attr('cx', patternSize / 2).attr('cy', patternSize / 2)
      .attr('r', 0.8)
      .attr('fill', isDark ? 'rgba(63,63,70,0.3)' : 'rgba(161,161,170,0.25)');

    d3Svg.append('rect')
      .attr('width', width).attr('height', height)
      .attr('fill', 'url(#grid-dots)').attr('rx', 12);

    const g = d3Svg.append('g');

    // links
    const linkGroup = g.append('g')
      .selectAll<SVGLineElement, GraphLink>('line')
      .data(links)
      .join('line')
      .attr('stroke', colors.linkStroke)
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '4,4')
      .style('transition', 'stroke 0.3s');

    // node groups
    const nodeGroup = g.append('g')
      .selectAll<SVGGElement, GraphNode>('g')
      .data(nodes, (d) => d.id)
      .join('g')
      .attr('cursor', (d) => d.link ? 'pointer' : 'grab')
      .attr('opacity', 0);

    // staggered entry animation
    nodeGroup.each(function (_, i) {
      d3.select(this).transition().delay(i * 40).duration(400).attr('opacity', 1);
    });

    // company-specific decorations: outer ring + pulse ring for linked nodes
    const companyNodes = nodeGroup.filter((d) => d.type === 'company');
    companyNodes.each(function (d) {
      const node = d3.select(this);
      if (d.link) {
        node.append('circle')
          .attr('r', d.radius + 3)
          .attr('fill', 'none')
          .attr('stroke', colors.hoverStroke)
          .attr('stroke-width', 1.5)
          .attr('class', 'pulse-ring');
      }
      node.append('circle')
        .attr('r', d.radius + 3)
        .attr('fill', 'none')
        .attr('stroke', colors.companyStroke)
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '2,3')
        .attr('opacity', 0.5)
        .attr('class', 'outer-ring');
    });

    // main circle + logo/initial — unified for all node types
    nodeGroup.each(function (d) {
      const node = d3.select(this);
      const isCompany = d.type === 'company';
      node.append('circle')
        .attr('r', d.radius)
        .attr('fill', isCompany ? colors.companyFill : colors.projectFill)
        .attr('stroke', isCompany ? colors.companyStroke : colors.projectStroke)
        .attr('stroke-width', isCompany ? 1.5 : 1)
        .attr('class', 'main-circle')
        .style('transition', 'stroke 0.3s, filter 0.3s');

      addNodeContent(node, d, colors.initialColor);
    });

    // labels — unified for all node types
    nodeGroup.append('text')
      .attr('y', (d) => d.radius + (d.type === 'company' ? 16 : 14))
      .attr('text-anchor', 'middle')
      .attr('font-family', 'monospace')
      .attr('font-size', (d) => d.type === 'company' ? 10 : 9)
      .attr('font-weight', (d) => d.type === 'company' ? '600' : 'normal')
      .attr('fill', colors.labelColor)
      .attr('class', 'node-label')
      .style('transition', 'fill 0.3s')
      .text((d) => d.label.length > MAX_LABEL_LEN
        ? d.label.substring(0, MAX_LABEL_LEN - 1) + '\u2026'
        : d.label,
      );

    // hover interactions
    nodeGroup
      .on('mouseenter', function (_, d) {
        const el = d3.select(this);
        el.select('.main-circle').attr('stroke', colors.hoverStroke).attr('filter', 'url(#glow)');
        el.select('.outer-ring').attr('stroke', colors.hoverStroke).attr('opacity', 1);
        el.select('.node-label').attr('fill', colors.labelColorHover);

        linkGroup
          .attr('stroke', (l) => {
            const src = typeof l.source === 'object' ? l.source.id : l.source;
            const tgt = typeof l.target === 'object' ? l.target.id : l.target;
            return src === d.id || tgt === d.id ? colors.linkStrokeHover : colors.linkStroke;
          })
          .attr('stroke-width', (l) => {
            const src = typeof l.source === 'object' ? l.source.id : l.source;
            const tgt = typeof l.target === 'object' ? l.target.id : l.target;
            return src === d.id || tgt === d.id ? 2.5 : 1.5;
          });

        const svgRect = svg.getBoundingClientRect();
        const scaleX = svgRect.width / width;
        const scaleY = svgRect.height / height;
        showTooltip({
          x: svgRect.left + (d.x ?? 0) * scaleX,
          y: svgRect.top + (d.y ?? 0) * scaleY - (d.radius + 12) * scaleY,
          label: d.label,
          role: d.role,
          description: d.description,
          link: d.link,
          logo: d.logo,
        });
      })
      .on('mouseleave', function (_, d) {
        const el = d3.select(this);
        const isCompany = d.type === 'company';
        el.select('.main-circle')
          .attr('stroke', isCompany ? colors.companyStroke : colors.projectStroke)
          .attr('filter', null);
        el.select('.outer-ring').attr('stroke', colors.companyStroke).attr('opacity', 0.5);
        el.select('.node-label').attr('fill', colors.labelColor);
        linkGroup.attr('stroke', colors.linkStroke).attr('stroke-width', 1.5);
        hideTooltip();
      })
      .on('click', (_, d) => {
        if (d.link) window.open(d.link, '_blank', 'noopener,noreferrer');
      });

    // drag behavior
    const drag = d3.drag<SVGGElement, GraphNode>()
      .on('start', (_event, d) => {
        if (!_event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x; d.fy = d.y;
      })
      .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
      .on('end', (_event, d) => {
        if (!_event.active) simulation.alphaTarget(0);
        d.fx = null; d.fy = null;
      });

    nodeGroup.call(drag);

    // force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(links)
        .id((d) => d.id)
        .distance((l) => (l.target as GraphNode).type === 'project' ? 90 : 140)
        .strength(0.8),
      )
      .force('charge', d3.forceManyBody()
        .strength((d) => (d as GraphNode).type === 'company' ? -350 : -120),
      )
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<GraphNode>().radius((d) => d.radius + 20).strength(0.7))
      .force('x', d3.forceX(width / 2).strength(0.06))
      .force('y', d3.forceY(height / 2).strength(0.06))
      .on('tick', () => {
        nodes.forEach((d) => {
          const pad = d.radius + 20;
          d.x = Math.max(pad, Math.min(width - pad, d.x ?? width / 2));
          d.y = Math.max(pad, Math.min(height - pad, d.y ?? height / 2));
        });
        linkGroup
          .attr('x1', (d) => (d.source as GraphNode).x ?? 0)
          .attr('y1', (d) => (d.source as GraphNode).y ?? 0)
          .attr('x2', (d) => (d.target as GraphNode).x ?? 0)
          .attr('y2', (d) => (d.target as GraphNode).y ?? 0);
        nodeGroup.attr('transform', (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
      });

    simulationRef.current = simulation;

    // resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = Math.max(420, Math.min(560, w * 0.55));
      d3Svg.attr('width', w).attr('height', h).attr('viewBox', `0 0 ${w} ${h}`);
      d3Svg.select('rect').attr('width', w).attr('height', h);
      simulation
        .force('center', d3.forceCenter(w / 2, h / 2))
        .force('x', d3.forceX(w / 2).strength(0.06))
        .force('y', d3.forceY(h / 2).strength(0.06))
        .alpha(0.3).restart();
    };
    window.addEventListener('resize', handleResize);

    // theme observer — unified via nodeGroup
    const observer = new MutationObserver(() => {
      const nowDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const c = getColors(nowDark);

      gridPattern.select('circle')
        .attr('fill', nowDark ? 'rgba(63,63,70,0.3)' : 'rgba(161,161,170,0.25)');
      nodeGroup.select('.main-circle')
        .attr('fill', (d) => d.type === 'company' ? c.companyFill : c.projectFill)
        .attr('stroke', (d) => d.type === 'company' ? c.companyStroke : c.projectStroke);
      nodeGroup.select('.outer-ring').attr('stroke', c.companyStroke);
      nodeGroup.select('.node-label').attr('fill', c.labelColor);
      nodeGroup.select('.fallback-initial').attr('fill', c.initialColor);
      linkGroup.attr('stroke', c.linkStroke);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      simulation.stop();
      simulationRef.current = null;
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    };
  }, [clients, t, showTooltip, hideTooltip]);

  return (
    <section
      id="clients"
      className="border-t border-zinc-200/50 dark:border-zinc-800/50 py-24"
      aria-label="Clients"
    >
      <style>{PULSE_RING_CSS}</style>
      <div className="mx-auto max-w-5xl px-5">
        <TerminalHeader command="tree --clients --graph" />
        <Reveal>
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/20"
          >
            <svg ref={svgRef} className="block w-full" style={{ minHeight: 420 }} />
            <div className="absolute bottom-3 left-4 select-none pointer-events-none">
              <span className="font-mono text-[10px] text-zinc-400/60 dark:text-zinc-600/60">
                {'// drag \u00b7 click to visit'}
              </span>
            </div>
            {tooltip && <NodeTooltip tooltip={tooltip} />}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export const Clients = memo(ClientsInner);
