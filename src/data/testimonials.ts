export interface Testimonial {
  id: number;
  name: string;
  feedback: string;
  rating: number;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya S",
    feedback:
      "The freshness of the meat here is unmatched! Every order I've received has been incredibly tender and flavorful. It's like it just came straight from the farm. I've stopped buying from anywhere else—this is my go-to for fresh pork!",
    rating: 5,
  },
  {
    id: 2,
    name: "Arjun M",
    feedback:
      "If you're looking for quality pork and delicious sausages, this is the place. The sausages are perfectly spiced and juicy, and the pork is always fresh. It's so convenient to order and have it delivered to my doorstep.",
    rating: 5,
  },
  {
    id: 3,
    name: "Neha R",
    feedback:
      "The pork here is 100% organic, and you can taste the difference! Every cut is so flavorful and juicy. From roasts to sausages, everything I've tried has been exceptional. Hands down, the best place for pork and pork items!",
    rating: 5,
  },
  {
    id: 4,
    name: "Rahul K",
    feedback:
      "This site has everything a pork lover could ask for! The meat is always fresh, and I love the variety of cuts and items they offer. It's perfect for trying out new recipes or just enjoying a classic roast. Highly recommend!",
    rating: 5,
  },
];
