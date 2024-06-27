
import heroImage from '../../assets/images/hero.png'; // Ensure you have the image in your assets folder

const Hero = () => {
  return (
    <section className="relative">
      <img src={heroImage} alt="Hero" className="w-full h-screen object-cover" />
    </section>
  );
};

export default Hero;
