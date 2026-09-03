// "use client";

// import * as React from "react";
// import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
// import { useIsMobile } from "../../../../hooks/use-mobile";
// import {
// Card,
// CardContent,
// CardDescription,
// CardHeader,
// CardTitle,
// } from "../../../../components/ui/card";
// import {
// ChartConfig,
// ChartContainer,
// ChartTooltip,
// ChartTooltipContent,
// } from "../../../../components/ui/chart";
// import {
// Select,
// SelectContent,
// SelectItem,
// SelectTrigger,
// SelectValue,
// } from "../../../../components/ui/select";
// import {
// ToggleGroup,
// ToggleGroupItem,
// } from "../../../../components/ui/toggle-group";
// import { Skeleton } from "../../../../components/ui/skeleton";
// import { useState, useEffect, useMemo } from "react";
// import { useAgents } from "../../agent/hooks";
// import { useCallLogs } from "../../calls/hooks";
// import { formatDateISO, formatDateUS } from "../../../../../lib/dateFormat";

// export const description = "An interactive area chart for call analytics";

// const chartConfig = {
// inbound: {
// label: "Inbound Calls",
// color: "var(--primary)",
// },
// outbound: {
// label: "Outbound Calls",
// color: "var(--primary)",
// },
// } satisfies ChartConfig;

// export function ChartAreaInteractive() {
// const { data: user, isLoading: userLoading } = useAuth();
// const { currentOrgId: organizationId } = useCurrentOrganization();
// const isMobile = useIsMobile();

// const [timeRange, setTimeRange] = useState("7d");
// const [selectedAgentId, setSelectedAgentId] = useState<string>("all");

// const { data: agentsData, isLoading: agentsLoading } = useAgents(
// organizationId as string,
// user?.id as string
// );

// const { data: callLogsData, isLoading: callLogsLoading, error: callLogsError } =
// useCallLogs(organizationId as string, user?.id as string, selectedAgentId === "all" ? undefined : selectedAgentId, timeRange);
// console.log(callLogsData);

// const agents = agentsData?.agents ?? [];
// const callLogs = callLogsData?.callLogs ?? [];

// useEffect(() => {
// if (isMobile) setTimeRange("7d");
// }, [isMobile]);

// /* -------------------- AGENT FILTER -------------------- */
// const filteredByAgent = useMemo(() => {
// if (!callLogs) return [];
// if (selectedAgentId === "all") return callLogs;
// return callLogs.filter((log: any) => log.agentId === selectedAgentId);
// }, [callLogs, selectedAgentId]);

// /* -------------------- TIME FILTER -------------------- */
// const filteredByTime = useMemo(() => {
// if (!filteredByAgent) return [];

// const now = new Date();
// let days = 7;
// if (timeRange === "30d") days = 30;
// if (timeRange === "90d") days = 90;

// const cutoff = new Date();
// cutoff.setDate(now.getDate() - days);

// return filteredByAgent.filter((log: any) => {
// if (!log.startTime) return false;
// return new Date(log.startTime) >= cutoff;
// });
// }, [filteredByAgent, timeRange]);

// /* -------------------- GROUP BY DATE -------------------- */
// const processedData = useMemo(() => {
// if (!filteredByTime || filteredByTime.length === 0) return [];

// const dataMap = new Map<
// string,
// { inbound: number; outbound: number }
// >();

// filteredByTime.forEach((log: any) => {
// if (!log.startTime) return;

// const date = formatDateISO(log.startTime)

// if (!dataMap.has(date)) {
// dataMap.set(date, { inbound: 0, outbound: 0 });
// }

// const current = dataMap.get(date)!;

// if (log.direction === "inbound") current.inbound += 1;
// if (log.direction === "outbound") current.outbound += 1;
// });

// return Array.from(dataMap.entries())
// .map(([date, counts]) => ({
// date,
// inbound: counts.inbound,
// outbound: counts.outbound,
// }))
// .sort(
// (a, b) =>
// new Date(a.date).getTime() -
// new Date(b.date).getTime()
// );
// }, [filteredByTime]);

// const isLoading = userLoading || agentsLoading || callLogsLoading;

// if (isLoading) {
// return (
// <Card>
// <CardHeader>
// <CardTitle>Call Analytics</CardTitle>
// <CardDescription>Loading call data...</CardDescription>
// </CardHeader>
// <CardContent>
// <Skeleton className="h-[250px] w-full " />
// </CardContent>
// </Card>
// );
// }

// if (callLogsError) {
// return (
// <Card>
// <CardHeader>
// <CardTitle>Call Analytics</CardTitle>
// <CardDescription>Error loading call data</CardDescription>
// </CardHeader>
// <CardContent className="h-[250px] flex items-center justify-center text-red-500">
// {(callLogsError as any)?.message ||
// "Failed to load call data"}
// </CardContent>
// </Card>
// );
// }

// return (
// <Card>
// <CardHeader>
// <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
// <div>
// <CardTitle>Call Analytics</CardTitle>
// <CardDescription>
// Filter by agent and time range
// </CardDescription>
// </div>

// <div className="flex flex-col sm:flex-row gap-2">

// {/* Agent Filter */}
// <Select
// value={selectedAgentId}
// onValueChange={setSelectedAgentId}
// >
// <SelectTrigger className="w-44 h-9">
// <SelectValue placeholder="All Agents" />
// </SelectTrigger>
// <SelectContent>
// <SelectItem value="all">
// All Agents
// </SelectItem>
// {agents.map((agent: any) => (
// <SelectItem
// key={agent.agentId}
// value={agent.agentId}
// >
// {agent.name}
// </SelectItem>
// ))}
// </SelectContent>
// </Select>

// {/* Desktop Toggle */}
// <ToggleGroup
// type="single"
// value={timeRange}
// onValueChange={(val) =>
// val && setTimeRange(val)
// }
// variant="outline"
// className="hidden md:flex"
// >
// <ToggleGroupItem value="90d">
// 90d
// </ToggleGroupItem>
// <ToggleGroupItem value="30d">
// 30d
// </ToggleGroupItem>
// <ToggleGroupItem value="7d">
// 7d
// </ToggleGroupItem>
// </ToggleGroup>

// {/* Mobile Select */}
// <Select
// value={timeRange}
// onValueChange={setTimeRange}
// >
// <SelectTrigger className="w-32 h-9 md:hidden">
// <SelectValue />
// </SelectTrigger>
// <SelectContent>
// <SelectItem value="90d">
// Last 90 days
// </SelectItem>
// <SelectItem value="30d">
// Last 30 days
// </SelectItem>
// <SelectItem value="7d">
// Last 7 days
// </SelectItem>
// </SelectContent>
// </Select>
// </div>
// </div>
// </CardHeader>

// <CardContent>
// {processedData.length > 0 ? (
// <ChartContainer
// config={chartConfig}
// className="h-[250px] w-full"
// >
// <AreaChart data={processedData}>
// <defs>
// <linearGradient
// id="fillInbound"
// x1="0"
// y1="0"
// x2="0"
// y2="1"
// >
// <stop
// offset="5%"
// stopColor="#6366f1"
// stopOpacity={0.8}
// />
// <stop
// offset="95%"
// stopColor="#6366f1"
// stopOpacity={0.1}
// />
// </linearGradient>

// <linearGradient
// id="fillOutbound"
// x1="0"
// y1="0"
// x2="0"
// y2="1"
// >
// <stop
// offset="5%"
// stopColor="#22d3ee"
// stopOpacity={0.8}
// />
// <stop
// offset="95%"
// stopColor="#22d3ee"
// stopOpacity={0.1}
// />
// </linearGradient>
// </defs>

// <CartesianGrid vertical={false} />

// <XAxis
// dataKey="date"
// tickLine={false}
// axisLine={false}
// tickFormatter={(value) => formatDateUS(value)}
// />

// <YAxis
// tickLine={false}
// axisLine={false}
// allowDecimals={false}
// />

// <ChartTooltip
// cursor={false}
// content={
// <ChartTooltipContent
// labelFormatter={(value) => formatDateUS(value)}
// indicator="dot"
// />
// }
// />

// <Area
// dataKey="inbound"
// type="monotone"
// fill="url(#fillInbound)"
// stroke="#6366f1"
// />

// <Area
// dataKey="outbound"
// type="monotone"
// fill="url(#fillOutbound)"
// stroke="#22d3ee"
// />
// </AreaChart>
// </ChartContainer>
// ) : (
// <div className="h-[250px] flex items-center justify-center text-muted-foreground">
// No call data available
// </div>
// )}
// </CardContent>
// </Card>
// );
// }