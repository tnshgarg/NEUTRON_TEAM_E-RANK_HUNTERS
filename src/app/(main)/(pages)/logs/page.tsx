"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LogEntry {
  timestamp: string;
  workflowId: string;
  message: string;
}

const fetchLogs = async (): Promise<LogEntry[]> => {
  // Placeholder function for fetching logs from an API endpoint
  // Replace this with your actual API call
  return [
    {
      timestamp: "2024-10-27 10:00:00",
      workflowId: "workflow1",
      message: "Workflow started",
    },
    {
      timestamp: "2024-10-27 10:00:05",
      workflowId: "workflow1",
      message: "Step 1 completed",
    },
    {
      timestamp: "2024-10-27 10:00:10",
      workflowId: "workflow1",
      message: "Step 2 completed",
    },
    {
      timestamp: "2024-10-27 10:00:15",
      workflowId: "workflow1",
      message: "Workflow finished",
    },
    {
      timestamp: "2024-10-27 11:00:00",
      workflowId: "workflow2",
      message: "Workflow started",
    },
    {
      timestamp: "2024-10-27 11:00:10",
      workflowId: "workflow2",
      message: "Workflow finished with error",
    },
  ];
};

const LogsPage: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadLogs = async () => {
      setLoading(true);
      const fetchedLogs = await fetchLogs();
      setLogs(fetchedLogs);
      setLoading(false);
    };

    loadLogs();
  }, []);

  if (loading) {
    return <div>Loading logs...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Workflow Logs</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Workflow ID</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>{log.workflowId}</TableCell>
                <TableCell>{log.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LogsPage;
