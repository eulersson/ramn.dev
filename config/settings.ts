import { BreakpointKey } from "@/types";

type AppConfig = {
  navBarHorizontalAtBreakpoint: BreakpointKey;
  projects: string[];
  featuredProjects: string[];
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
    "l-systems-maya",
    "cell-growth",
    "position-based-dynamics",
    "appleseed",
    "bvlsys",
    "phongo-clap-rt",
    "cerda",
    "hamnet",
    "animation-reel",
    "self-seeker",
    "samfaelni",
    "obsidian-github-exporter",
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
};

export default appConfig;
