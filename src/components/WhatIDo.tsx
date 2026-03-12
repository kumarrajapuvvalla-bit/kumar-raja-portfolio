import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";

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
              <h4>Kubernetes Platforms | GitOps Deployments | Infrastructure as Code | Platform Observability</h4>
              <p>
                Designed and maintained a scalable platform to standardize infrastructure, application deployment, and observability.
                Enabled developer self service through automated infrastructure, Kubernetes platforms, and GitOps-based deployments.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Backstage, Kubernetes, Helm, OpenShift, Argo CD, Terraform, Prometheus, Grafana</div>
                <div className="what-tags">AWS (Elastic Kubernetes Service, CloudWatch, Config, CloudTrail, IAM)</div>
                <div className="what-tags">Azure (Kubernetes Service, Key Vault)</div>
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
              <h4>Automation | CI/CD Pipelines | Containerization | Monitoring & Logging</h4>
              <p>
                Designed and implemented automated CI/CD pipelines and infrastructure provisioning across AWS, Azure, and GCP environments.
                Improved release reliability, deployment speed, and operational visibility through containerized workloads, automated configuration management, and centralized monitoring.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">GitHub Actions, Azure DevOps, Jenkins, Docker, Ansible, SonarQube, ELK Stack</div>
                <div className="what-tags">AWS (AWS CloudFormation, AWS CloudWatch)</div>
                <div className="what-tags">Azure (Azure Resource Manager, Azure Monitor, Log Analytics)</div>
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
