import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialScrollProps {
  className?: string;
}

const motivationalQuotes = [
  "Your journey as a developer has ups and downs. Remember that struggles are part of growth, not failure.",
  "Every challenge you face as a developer is a stepping stone toward mastery and confidence.",
  "Struggle is not a sign of failure but proof that you’re pushing your limits and growing.",
  "Take a breath. Growth happens outside your comfort zone, and you’re doing amazing.",
  "Remember: even the best developers started where you are now. Keep going.",
  "Your persistence through hard times builds the foundation of your success."
];

const testimonials = [
  {
    name: "Sarah Chen",
    quote: motivationalQuotes[0],
    avatar: "/pfp/image-1.png",
    initials: "SC",
  },
  {
    name: "Marcus Johnson",
    quote: motivationalQuotes[1],
    avatar: "/pfp/image-2.png",
    initials: "MJ",
  },
  {
    name: "Priya Sharma",
    quote: motivationalQuotes[2],
    avatar: "/pfp/image-3.png",
    initials: "PS",
  },
  {
    name: "David Kim",
    quote: motivationalQuotes[3],
    avatar: "/pfp/image-4.png",
    initials: "DK",
  },
  {
    name: "Alex Rivera",
    quote: motivationalQuotes[4],
    avatar: "/pfp/image-5.png",
    initials: "AR",
  },
  {
    name: "Emma Wilson",
    quote: motivationalQuotes[5],
    avatar: "/pfp/image-1.png",  // Reuse first image or set fallback
    initials: "EW",
  }
];


const TestimonialScroll: React.FC<TestimonialScrollProps> = ({ className }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!carouselRef.current) return;

    const scrollContainer = carouselRef.current;
    scrollContainer.style.scrollBehavior = 'smooth'; // make scroll smooth

    const scrollAmount = 10; // px per tick
    const intervalTime = 10; // ms

    const interval = setInterval(() => {
      if (!isHovered) {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += scrollAmount;
        }
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <h3 className="text-center text-xl md:text-2xl font-serif mb-6 text-purple-200">
        DevHaven's best lines
      </h3>

      <Carousel className="w-full">
        <CarouselContent
          ref={carouselRef}
          className="gap-4 py-4 flex-nowrap flex overflow-x-auto scrollbar-hide"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ scrollBehavior: 'smooth' }}
        >
          {testimonials.concat(testimonials).map((testimonial, index) => (
            <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="h-full"
              >
                <Card className="bg-black/40 backdrop-blur-md border border-purple-500/20 p-5 rounded-xl shadow-lg hover:shadow-purple-500/10 transition-all duration-500 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10 ring-2 ring-purple-400/20">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-white">{testimonial.name}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic text-sm">{`"${testimonial.quote}"`}</p>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TestimonialScroll;
