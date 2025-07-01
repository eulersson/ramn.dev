import { BreakpointKey } from "@/types";

type AppConfig = {
  navBarHorizontalAtBreakpoint: BreakpointKey;
  projects: string[];
  featuredProjects: string[];
};

const appConfig: AppConfig = {
  navBarHorizontalAtBreakpoint: "lg",
  projects: [
    "watchity",
    "taconez",
    "anthem",
    "dreamdrugs",
    "ramn-dev",
    "fargate-microservices",
    "appleseed",
    "cell-growth",
    "l-systems-maya",
    "phongo-clap-rt",
    "position-based-dynamics",
    "bvlsys",
    "tagr",
    "cerda",
    "hamnet",
    "animation-reel",
    "self-seeker",
    "samfaelni",
  ],
  featuredProjects: [
    "watchity",
    "taconez",
    "anthem",
    "fargate-microservices",
    "dreamdrugs",
    "ramn-dev",
  ],
};

export default appConfig;
