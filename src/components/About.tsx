import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          Platform & Devops Engineer with 3+ years building and operating production-grade cloud infrastructure across AWS, GCP, and Azure. I specialise in Kubernetes platform engineering, Terraform IaC, CI/CD automation, and backend service development. Abstracting infrastructure complexity so engineering teams can ship faster. I've designed self service platforms that reduce deployment failures, cut pipeline queue times, and drive operational excellence at scale. Equally comfortable working on Kubernetes controllers and backend APIs as I am on multi-AZ cluster architecture and service mesh configuration. Skilled in microservices architecture and deeply passionate about exploring AI powered infrastructure tooling and MLOps pipelines to bring the next generation of self-healing, self-optimising platforms to life.
        </p>
      </div>
    </div>
  );
};

export default About;
