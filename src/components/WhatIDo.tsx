import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    const handlers: (() => void)[] = [];
    containerRef.current.forEach((container) => {
      if (container) {
        container.classList.remove("what-noTouch");
        const handler = () => handleClick(container);
        container.addEventListener("click", handler);
        handlers.push(() => container.removeEventListener("click", handler));
      }
    });
    return () => handlers.forEach((cleanup) => cleanup());
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>PLATFORM ENGINEERING</h3>
              <h4>Designing and managing scalable cloud infrastructure</h4>
              <p>
                Building secure, scalable infrastructure across multi-cloud environments.
                From networking and identity management to managed compute and databases, I design
                cloud platforms that support highly available applications.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Azure (VNet, Azure AD, Key Vault, Monitor, Log Analytics, AKS)</div>
                <div className="what-tags">AWS (EC2, ECS, Lambda, IAM, VPC, S3, ALB, RDS, EKS, CloudWatch, Secrets Manager)</div>
                <div className="what-tags">GCP (Cloud Run, Cloud Functions, Cloud SQL, BigQuery, Dialogflow)</div>
              </div>
            </div>
            <div className="what-arrow"></div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>DEVOPS ENGINEERING</h3>
              <h4>Automation, CI/CD pipelines, container platforms</h4>
              <p>
                Implementing automated delivery pipelines and infrastructure automation
                to enable fast, reliable deployments. I build containerised environments, implement
                Infrastructure as Code, and maintain observability for production systems.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">CI/CD: GitHub Actions, Azure DevOps, Jenkins, Argo CD</div>
                <div className="what-tags">IaC: Terraform, ARM, CloudFormation</div>
                <div className="what-tags">Containers & Orchestration: Docker, Kubernetes (AKS, EKS), Helm</div>
                <div className="what-tags">Monitoring & Logging: Prometheus, Grafana, ELK</div>
                <div className="what-tags">OS & Scripting: Linux, Python, Bash, Go, YAML</div>
              </div>
            </div>
            <div className="what-arrow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
