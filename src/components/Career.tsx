import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Platform Engineer</h4>
                <h5>Tech Nxt Gen, UK</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Architected and operated a production AWS EKS platform across multi-AZ
              clusters with ALB ingress, HPA autoscaling, and Terraform-managed IRSA roles sustaining
              99.9% uptime. Built end-to-end GitHub Actions CI/CD pipelines with integrated SonarQube
              and Semgrep security scanning, reducing release lead time by 45%. Rationalised
              observability from 85 noisy alerts to 11 actionable signals, cutting mean time to
              acknowledge from 22 to 4 minutes.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Azure Platform Engineer</h4>
                <h5>PwC Information Technology, UK</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Led Terraform infrastructure provisioning across multiple Azure subscriptions
              for a major UK bank migration. Designed a standardised CI/CD framework across 6 delivery
              teams using Azure DevOps and GitHub Actions, reducing deployment failures by 30%. Replaced
              a static 12-agent pool with a Terraform-managed Azure VMSS autoscaling fleet, cutting
              pipeline queue time from 140 to under 12 minutes on release days.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>DevOps Engineer</h4>
                <h5>Elekta, UK</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Supported cloud infrastructure and CI/CD automation for medical technology
              platforms across AWS and Azure in a regulated healthcare environment. Containerised
              application components with Docker and Kubernetes using Helm. Developed Ansible playbooks
              to automate server configuration, reducing provisioning time and eliminating configuration
              drift.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
