<template>
  <div class="portfolio-container">
    <header class="hero-section">
      <h1 class="name">Badr Ribzat</h1>
      <p class="title">Full Stack Software Engineer</p>
    </header>
    <main class="content-section">
      <section class="about-section">
        <h2>About Me</h2>
        <p>
          I'm a passionate Full Stack Software Engineer based in Morocco, with a
          strong foundation in both front-end and back-end technologies. My
          approach to software development is rooted in the understanding that
          technology is constantly evolving, and there's always more to learn
          and explore.
        </p>
        <div class="personal-info">
          <p><strong>Location:</strong> Morocco</p>
          <p>
            <strong>Email:</strong>
            <a href="mailto:badrribzat@gmail.com">badrribzat@gmail.com</a>
          </p>
          <p><strong>Phone:</strong> +212627764176</p>
          <p>
            <strong>GitHub:</strong>
            <a href="https://github.com/BadrRibzat" target="_blank"
              >github.com/BadrRibzat</a
            >
          </p>
          <p>
            <strong>LinkedIn:</strong>
            <a
              href="https://www.linkedin.com/in/badr-ribzat14121990"
              target="_blank"
              >linkedin.com/in/badr-ribzat14121990</a
            >
          </p>
        </div>
      </section>
      <section class="skills-section">
        <h2>Skills</h2>
        <div class="skills-grid">
          <div class="skill-item" v-for="skill in skills" :key="skill">
            <span class="skill-name">{{ skill }}</span>
            <meter min="0" max="100" value="50" class="skill-meter"></meter>
          </div>
        </div>
      </section>
      <section class="projects-section">
        <h2>Projects</h2>
        <div class="project-card">
          <h3>English Learning Platform</h3>
          <p>
            An interactive web application designed to help users learn English
            through personalized lessons, quizzes, and progress tracking. This
            project showcases my ability to create a full-stack application with
            a focus on user experience and educational value.
          </p>
          <div class="tech-stack">
            <span v-for="tech in projectTech" :key="tech" class="tech-item">{{
              tech
            }}</span>
          </div>
          <a href="/courses" class="project-link">View Project</a>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'PortfolioView',
  data () {
    return {
      skills: [
        'JavaScript',
        'Vue.js',
        'Node.js',
        'Python',
        'Flask',
        'MongoDB',
        'HTML5',
        'CSS3',
        'RESTful APIs',
        'Git'
      ],
      projectTech: ['Vue.js', 'Flask', 'MongoDB', 'Tailwind CSS']
    }
  }
}
</script>

<style scoped>
.portfolio-container {
  background-color: #f4f7f6;
  color: #333;
  min-height: 100vh;
  font-family: "Arial", sans-serif;
}

.hero-section {
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
  text-align: center;
  padding: 100px 20px;
}

.name {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 10px;
  letter-spacing: 2px;
}

.title {
  font-size: 24px;
  opacity: 0.9;
}

.content-section {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

h2 {
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.about-section p {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.personal-info {
  background-color: #e8f4fc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.personal-info p {
  margin-bottom: 10px;
}

.personal-info a {
  color: #3498db;
  text-decoration: none;
}

.personal-info a:hover {
  text-decoration: underline;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.skill-item {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.skill-name {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #2c3e50;
}

.skill-meter {
  width: 100%;
  height: 20px;
}

.skill-meter::-webkit-meter-bar {
  background: #e0e7ff;
  border-radius: 10px;
}

.skill-meter::-webkit-meter-optimum-value {
  background: linear-gradient(90deg, #3498db, #2980b9);
  border-radius: 10px;
}

.project-card {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.project-card h3 {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 15px;
}

.project-card p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.tech-item {
  background-color: #f0f4f8;
  color: #3498db;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
}

.project-link {
  display: inline-block;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.project-link:hover {
  background-color: #2980b9;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 20px;
  }

  .name {
    font-size: 36px;
  }

  .title {
    font-size: 20px;
  }

  .content-section {
    padding: 30px 20px;
  }

  h2 {
    font-size: 24px;
  }

  .about-section p {
    font-size: 16px;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
