import { useState, useCallback } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    number: "01",
    title: "Production EKS Platform — AI SaaS",
    category: "Cloud Infrastructure / Platform Engineering",
    tools: "AWS · Terraform · EKS · GitHub Actions · ArgoCD · Helm · CloudWatch · IAM · SonarQube",
    image: "/images/3_eks-platform.png",
    description:
      "Designed and provisioned a full AWS production platform from scratch. Multi-AZ VPC with public/private subnets, EKS cluster with ALB ingress, HPA autoscaling, and IAM least-privilege IRSA roles per workload. Established GitOps delivery via ArgoCD with Helm chart versioning and canary rollout strategy. CI/CD pipeline with SonarQube and Semgrep security scanning enabling zero downtime deployments.",
  },
  {
    number: "02",
    title: "Pipeline Standardisation & Agent Autoscaling",
    category: "CI/CD / DevOps Engineering",
    tools: "Azure DevOps · Terraform · VMSS · Docker · AKS · GitHub Actions · Workload Identity Federation",
    image: "/images/2_pipeline-standardisation.png",
    description:
      "Standardised CI/CD framework across 6 delivery teams with reusable YAML templates and environment promotion gates. Replaced all client secret authentication with Workload Identity Federation. VMSS autoscaling agent fleet scaled from 4 to 40 agents at peak, cutting pipeline queue time from 140 to under 20 minutes on release days.",
  },
  {
    number: "03",
    title: "Insurance Cloud Platform — GCP/Azure Hybrid",
    category: "Cloud Platform / Backend Engineering",
    tools: "GCP · Terraform · Cloud Run · Cloud SQL · Dialogflow CX · BigQuery · FastAPI · Docker · Azure DevOps",
    image: "/images/4_insurance-platform.png",
    description:
      "Full insurance backend built on GCP from scratch. Layered VPC networking, Cloud Run REST API in Python/FastAPI, private Cloud SQL via VPC Access Connector, credentials from Secret Manager. Go-based Cloud Functions for ETL, Dialogflow CX chatbot for customer queries, BigQuery for reporting. Deployed via Azure DevOps with canary strategy.",
  },
  {
    number: "04",
    title: "IaC Adoption & Environment Standardisation",
    category: "Infrastructure as Code",
    tools: "Terraform · CloudFormation · AWS · Azure · Kubernetes · Helm · Git",
    image: "/images/1_iac-adoption.png",
    description:
      "Migrated manual environment setup to fully Terraform-managed AWS and Azure infrastructure. Reusable modules for VPC, Kubernetes clusters, and database tiers enabling repeatable deployments across dev, staging, and production. Eliminated configuration drift through peer-reviewed version-controlled IaC.",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    goToSlide(currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex === projects.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, goToSlide]);

  return (
    <section className="work-section" id="work">
      <div className="work-inner section-container">
        <h2 className="work-heading">My <span>Work</span></h2>

        <div className="work-carousel">
          {/* Arrow buttons */}
          <button
            className="work-arrow work-arrow-prev"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="work-arrow work-arrow-next"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Track */}
          <div className="work-track-clip">
            <div
              className="work-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, i) => (
                <div className="work-slide" key={i}>
                  {/* LEFT */}
                  <div className="work-slide-left">
                    <span className="work-num">{project.number}</span>
                    <div className="work-details">
                      <h3 className="work-title">{project.title}</h3>
                      <p className="work-category">{project.category}</p>
                      <div className="work-tools-block">
                        <span className="work-tools-label">Tools &amp; Features</span>
                        <p className="work-tools-text">{project.tools}</p>
                      </div>
                      <p className="work-desc">{project.description}</p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="work-slide-right">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'12px', border:'1px solid rgba(0,212,184,0.3)', background:'#0a0f1a'}}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="work-dots">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`work-dot${i === currentIndex ? " work-dot-active" : ""}`}
                onClick={() => goToSlide(i)}
                aria-label={`Go to project ${i + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
