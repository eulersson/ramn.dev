import { BreakpointKey } from "@/types";

type AppConfig = {
  navBarHorizontalAtBreakpoint: BreakpointKey;
  projects: string[];
  featuredProjects: string[];
  touchDeviceDisableCursor: boolean;
};

const appConfig: AppConfig = {
  navBarHorizontalAtBreakpoint: "lg",
  projects: [
    "dreamdrugs",
    "watchity",
    "taconez",
    "ritmely",
    "ramn-dev",
    "ariviz",
    "fargate-microservices",
    "tagr",
    "obsidian-github-exporter",
    "appleseed",
    "l-systems-maya",
    "cell-growth",
    "phongo-clap-rt",
    "cerda",
    "position-based-dynamics",
    "bvlsys",
    "animation-reel",
    "hamnet",
    "self-seeker",
    "samfaelni",
  ],
  featuredProjects: [
    "dreamdrugs",
    "watchity",
    "taconez",
    "ritmely",
    "ariviz",
    "fargate-microservices",
    "ramn-dev",
  ],
  touchDeviceDisableCursor: true,
};

export default appConfig;
