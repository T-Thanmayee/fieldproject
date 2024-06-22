import "./Home.css";

function Home() {
  return (
    <div className='articleHome'>
      <h1 style={{ color: 'green' }}>Where Creativity Meets Opportunity: Celebrating Every Voice!</h1>
      <img 
        src="https://img.indiafilings.com/learn/wp-content/uploads/2019/09/12004227/Economically-Weaker-Sections-Bill.jpg"
        alt="Blogging Woman Reading Blog" 
        className="artcleImage" 
      />
      <p className="lead">
      we believe in the power of diversity and inclusivity. We are committed to providing a platform where individuals from all walks of life can showcase their talents and share their unique stories. We invite people from underserved and underrepresented communities to join us and display their work on our website. Whether you are an artist, a writer, a craftsman, or have any other skill, we want to help you reach a wider audience and gain the recognition you deserve. Join us in building a community that celebrates creativity, resilience, and the rich tapestry of human experience. Together, we can create opportunities, foster connections, and inspire change.
      </p>
    </div>
  );
}

export default Home;
