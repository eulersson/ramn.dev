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
    "efesto-lab",
    "cell-growth",
    "l-systems-maya",
    "appleseed",
    "phongo-clap-rt",
    "obsidian-github-exporter",
    "bvlsys",
    "cerda",
    "animation-reel",
    "position-based-dynamics",
    "self-seeker",
    "hamnet",
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
