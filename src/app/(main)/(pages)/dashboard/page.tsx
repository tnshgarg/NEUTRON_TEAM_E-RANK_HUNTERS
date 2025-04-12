"use client"
import React, { useRef, useEffect, useState } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import Circle from "@/components/circle";
import Icons from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardPage = () => {
  const containerRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  
  const workflows = [
    {
      title: "Workflow 1: All Connected Apps",
      logos: [
        { app: "notion", ref: useRef<HTMLDivElement>(null), color: "rgba(0,0,0,0.6)" },
        { app: "discord", ref: useRef<HTMLDivElement>(null), color: "rgba(114,137,218,0.8)" },
        { app: "slack", ref: useRef<HTMLDivElement>(null), color: "rgba(74,21,75,0.8)" },
        { app: "gdrive", ref: useRef<HTMLDivElement>(null), color: "rgba(66,133,244,0.8)" },
      ]
    },
    {
      title: "Workflow 2: Without Discord",
      logos: [
        { app: "notion", ref: useRef<HTMLDivElement>(null), color: "rgba(0,0,0,0.6)" },
        { app: "slack", ref: useRef<HTMLDivElement>(null), color: "rgba(74,21,75,0.8)" },
        { app: "gdrive", ref: useRef<HTMLDivElement>(null), color: "rgba(66,133,244,0.8)" },
      ]
    },
    {
      title: "Workflow 3: Basic Integration",
      logos: [
        { app: "notion", ref: useRef<HTMLDivElement>(null), color: "rgba(0,0,0,0.6)" },
        { app: "gdrive", ref: useRef<HTMLDivElement>(null), color: "rgba(66,133,244,0.8)" },
      ]
    },
    {
      title: "Workflow 4: Without Notion",
      logos: [
        { app: "discord", ref: useRef<HTMLDivElement>(null), color: "rgba(114,137,218,0.8)" },
        { app: "slack", ref: useRef<HTMLDivElement>(null), color: "rgba(74,21,75,0.8)" },
        { app: "gdrive", ref: useRef<HTMLDivElement>(null), color: "rgba(66,133,244,0.8)" },
      ]
    },
  ];

  const recentWorkflows = [
    {
      title: "Document Update Flow",
      date: "April 12, 2025",
      status: "Active",
      description: "Updates documents across Notion and Google Drive when changes are detected",
      apps: ["notion", "gdrive"]
    },
    {
      title: "Team Notification System",
      date: "April 11, 2025",
      status: "Active",
      description: "Sends automated notifications to Slack and Discord channels",
      apps: ["slack", "discord"]
    },
    {
      title: "Content Calendar Sync",
      date: "April 10, 2025",
      status: "Paused",
      description: "Synchronizes content calendars between platforms",
      apps: ["notion", "slack", "gdrive"]
    },
    {
      title: "Customer Support Flow",
      date: "April 8, 2025",
      status: "Active",
      description: "Routes customer inquiries to appropriate support channels",
      apps: ["discord", "slack"]
    },
  ];
  
  const [glowingLogos, setGlowingLogos] = useState(
    workflows.map(flow => Array(flow.logos.length).fill(false))
  );
  
  const animationSpeed = 2; // 2 seconds for each cycle
  
  useEffect(() => {
    const animationInterval = 30; // update every 30ms for smooth animation
    
    const timer = setInterval(() => {
      const currentTime = Date.now();
      const animationDuration = animationSpeed * 1000; // convert to milliseconds
      
      setGlowingLogos(prevGlowingLogos => {
        return workflows.map((workflow, flowIndex) => {
          const logosCount = workflow.logos.length;
          if (logosCount <= 1) return Array(logosCount).fill(false);
          
          const currentCyclePosition = (currentTime % animationDuration) / animationDuration;
          const newGlowingLogos = Array(logosCount).fill(false);
          
          // Calculate which logos should glow based on beam position
          const beamPosition = currentCyclePosition * (logosCount - 1);
          
          // Determine which logos should be glowing
          workflow.logos.forEach((_, logoIndex) => {
            // Enhanced glowing effect: logos glow when electricity is passing through them
            // Calculate distance from current beam position
            const distanceFromBeam = Math.abs(logoIndex - beamPosition);
            // Logos glow when beam is within 0.5 units of their position
            if (distanceFromBeam < 0.5) {
              newGlowingLogos[logoIndex] = true;
            }
          });
          
          return newGlowingLogos;
        });
      });
    }, animationInterval);
    
    return () => clearInterval(timer);
  }, [workflows]);

  const renderIcon = (app) => {
    switch(app) {
      case "notion": 
        return <Icons.notion />;
      case "discord": 
        return (
          <img 
            src="https://www.svgrepo.com/show/353655/discord-icon.svg" 
            alt="Discord" 
            className="size-12"
          />
        );
      case "slack": 
        return (
          <img 
            src="https://www.clipartmax.com/png/middle/438-4381196_start-and-finish-your-lean-coffee-session-in-slack-new-slack-logo.png" 
            alt="Slack" 
            className="size-10 object-contain"
          />
        );
      case "gdrive": 
        return <Icons.googleDrive />;
      default: 
        return null;
    }
  };

  const renderAppIcons = (apps) => {
    return (
      <div className="flex -space-x-2">
        {apps.map((app, index) => (
          <div key={index} className="w-8 h-8 rounded-full border-2 border-white bg-white flex items-center justify-center overflow-hidden">
            {app === "notion" && <Icons.notion />}
            {app === "discord" && <img src="https://www.svgrepo.com/show/353655/discord-icon.svg" alt="Discord" className="w-5 h-5" />}
            {app === "slack" && <img src="https://www.clipartmax.com/png/middle/438-4381196_start-and-finish-your-lean-coffee-session-in-slack-new-slack-logo.png" alt="Slack" className="w-5 h-5 object-contain" />}
            {app === "gdrive" && <Icons.googleDrive />}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8 md:px-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Connected Apps Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mb-12">
        {workflows.map((workflow, flowIndex) => (
          <div key={flowIndex} className="bg-white rounded-lg border shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">{workflow.title}</h2>
            
            <div
              className="relative flex h-[150px] w-full items-center justify-center overflow-hidden rounded-lg bg-white p-6"
              ref={containerRefs[flowIndex]}
            >
              <div className="flex justify-between items-center w-full h-full">
                {workflow.logos.map((logo, logoIndex) => (
                  <div key={logoIndex} className="flex items-center justify-center">
                    <Circle 
                      ref={logo.ref} 
                      className={`transition-all duration-300 ${
                        glowingLogos[flowIndex][logoIndex] 
                          ? `shadow-[0_0_30px_5px_${logo.color}] scale-110` 
                          : ''
                      }`}
                    >
                      {renderIcon(logo.app)}
                    </Circle>
                  </div>
                ))}
              </div>

              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 transform -translate-y-1/2"></div>

              {workflow.logos.length > 1 && (
                <AnimatedBeam
                  containerRef={containerRefs[flowIndex]}
                  fromRef={workflow.logos[0].ref}
                  toRef={workflow.logos[workflow.logos.length - 1].ref}
                  curvature={0}
                  duration={animationSpeed}
                  pathWidth={3}
                  active={true}
                  gradientStartColor="#9b87f5"
                  gradientStopColor="#1292FF"
                  pathColor="#e6e6e6"
                  pathOpacity={0.4}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Workflows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentWorkflows.map((workflow, index) => (
            <Card 
              key={index} 
              className={`border shadow hover:shadow-md transition-shadow ${
                workflow.status === 'Active' ? 'hover:border-green-200' : 'hover:border-yellow-200'
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-medium">{workflow.title}</CardTitle>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    workflow.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {workflow.status}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{workflow.date}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
                <div className="flex justify-between items-center">
                  {renderAppIcons(workflow.apps)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mt-12 w-full max-w-6xl bg-white rounded-lg border p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Statistics</h2>
          <div className="text-sm text-gray-500">Last updated: April 12, 2025</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg shadow">
            <div className="text-lg font-medium text-gray-700">Total Workflows</div>
            <div className="text-3xl font-bold text-blue-600">12</div>
            <div className="text-sm text-green-600 mt-1">↑ 20% from last month</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-lg shadow">
            <div className="text-lg font-medium text-gray-700">Active Workflows</div>
            <div className="text-3xl font-bold text-green-600">8</div>
            <div className="text-sm text-green-600 mt-1">↑ 15% from last month</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg shadow">
            <div className="text-lg font-medium text-gray-700">Connected Apps</div>
            <div className="text-3xl font-bold text-purple-600">4</div>
            <div className="text-sm text-blue-600 mt-1">+ 1 new this month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage
