import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useCart } from "../../hooks/useCart";

interface AnatomyPart {
  id: string;
  name: string;
  position: { top: string; left: string };
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    image: string;
    weight: string;
  };
}

const anatomyParts: AnatomyPart[] = [
  {
    id: "shoulder",
    name: "Pork Shoulder",
    position: { top: "40%", left: "100px" },
    product: {
      id: 1001,
      name: "Shoulder Picnic(without Bone)",
      description: "Premium shoulder cut, perfect for slow cooking",
      price: 640,
      image:
        "https://meatdelicacy.com/wp-content/uploads/2024/12/shoulder-picnic-2-768x1024.webp",
      weight: "1kg",
    },
  },
  {
    id: "ribs",
    name: "Pork Ribs",
    position: { top: "-5px", left: "19%" },
    product: {
      id: 1002,
      name: "Baby Back Ribs",
      description: "Tender and flavorful ribs for grilling",
      price: 660,
      image:
        "https://meatdelicacy.com/wp-content/uploads/2024/12/st.louis-style-spare-ribs-1024x1024.webp",
      weight: "1kg",
    },
  },
  {
    id: "belly",
    name: "Pork Belly",
    position: { top: "28%", left: "60%" },
    product: {
      id: 1003,
      name: "Belly Slice(without skin)",
      description: "Rich and fatty belly cuts for crispy preparations",
      price: 619,
      discountPrice: 680,
      image:
        "https://meatdelicacy.com/wp-content/uploads/2024/12/pork-belly-768x1024.webp",
      weight: "1kg",
    },
  },
  {
    id: "leg",
    name: "Pork Leg",
    position: { top: "35%", left: "10%" },
    product: {
      id: 1004,
      name: "Pork Leg(without bone)",
      description: "Lean leg meat, excellent for roasting",
      price: 579,
      discountPrice: 640,
      image:
        "https://meatdelicacy.com/wp-content/uploads/2024/12/pork-leg-768x1024.webp",
      weight: "1kg",
    },
  },
];

export const AnatomySection = () => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const { addToCart } = useCart();

  const handlePartClick = (partId: string) => {
    setSelectedPart(partId);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };

  const selectedPartData = anatomyParts.find(
    (part) => part.id === selectedPart,
  );

  return (
    <section className="bg-[#FCF3E8] py-20">
      <div className="max-w-7xl mx-auto px-3">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,340px] gap-15">
          {/* Interactive Anatomy Image */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center max-w-[800px]">
              <div className="relative">
                {/* Front Part */}
                <img
                  src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/home/parts/front.png"
                  alt="Pork Front"
                  className="inline max-w-full transition-opacity duration-300"
                />
                {/* Shoulder Dot */}
                <div
                  className="absolute w-4 h-4 bg-[#4E6B5D] rounded-full border-3 border-white cursor-pointer hover:scale-125 transition-transform duration-300 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    top: anatomyParts[0].position.top,
                    left: anatomyParts[0].position.left,
                  }}
                  onClick={() => handlePartClick("shoulder")}
                  aria-label="Pork Shoulder"
                />
              </div>

              {/* Middle Parts */}
              <div>
                <div className="relative -left-px -top-4">
                  <div>
                    <img
                      src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/home/parts/middle.png"
                      alt="Pork Middle"
                      className="inline max-w-full transition-opacity duration-300"
                    />
                  </div>
                  {/* Ribs Dot */}
                  <div
                    className="absolute w-4 h-4 bg-[#4E6B5D] rounded-full border-3 border-white cursor-pointer hover:scale-125 transition-transform duration-300 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      bottom: anatomyParts[1].position.top,
                      left: anatomyParts[1].position.left,
                    }}
                    onClick={() => handlePartClick("ribs")}
                    aria-label="Pork Ribs"
                  />
                </div>

                <div className="relative -left-px -top-5">
                  <div className="relative -left-px -top-4">
                    <img
                      src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/home/parts/middle-top.png"
                      alt="Pork Middle Top"
                      className="inline max-w-full transition-opacity duration-300"
                    />
                  </div>
                  {/* Belly Dot */}
                  <div
                    className="absolute w-4 h-4 bg-[#4E6B5D] rounded-full border-3 border-white cursor-pointer hover:scale-125 transition-transform duration-300 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      top: anatomyParts[2].position.top,
                      left: anatomyParts[2].position.left,
                    }}
                    onClick={() => handlePartClick("belly")}
                    aria-label="Pork Belly"
                  />
                </div>
              </div>

              {/* Back Part */}
              <div className="relative -left-1">
                <img
                  src="https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/home/parts/back.png"
                  alt="Pork Back"
                  className="inline max-w-full transition-opacity duration-300"
                />
                {/* Leg Dot */}
                <div
                  className="absolute w-4 h-4 bg-[#4E6B5D] rounded-full border-3 border-white cursor-pointer hover:scale-125 transition-transform duration-300 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    top: anatomyParts[3].position.top,
                    left: anatomyParts[3].position.left,
                  }}
                  onClick={() => handlePartClick("leg")}
                  aria-label="Pork Leg"
                />
              </div>
            </div>
          </div>

          {/* Product Information Panel */}
          <div className="min-h-[200px] relative">
            {selectedPartData ? (
              <div className="bg-white h-full transition-opacity duration-300">
                <div className="relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent z-10"></div>
                  <img
                    src={selectedPartData.product.image}
                    alt={selectedPartData.product.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-6 right-0 z-20">
                    <Badge
                      className="bg-[#C72C41] text-white font-bold text-xs uppercase tracking-wider py-2 px-3 border-none"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% 50%, 100% 100%, 8px 100%, 0 50%)",
                      }}
                    >
                      {selectedPartData.name}
                    </Badge>
                  </div>
                </div>

                <div className="flex-grow p-4">
                  <h5 className="text-lg font-bold leading-7 mb-1 text-[#262729]">
                    {selectedPartData.product.name}
                  </h5>
                  <p className="text-[#262729]/64 text-sm mb-2">
                    {selectedPartData.product.weight}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="font-bold">
                      <span className="text-xl leading-7 text-[#262729]">
                        ₹{selectedPartData.product.price}/-
                      </span>
                      {selectedPartData.product.discountPrice && (
                        <span className="text-[#C72C41] ml-2">
                          <span className="line-through">
                            ₹{selectedPartData.product.discountPrice}/-
                          </span>
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={() => handleAddToCart(selectedPartData.product)}
                      className="bg-[#C72C41] text-white font-bold text-sm uppercase px-6 py-2 hover:bg-[#C72C41]/90 transition-all duration-300"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#C72C41]/12 border border-[#262729]/40 text-[#262729]/40 font-medium h-full flex items-center justify-center p-10 text-center">
                <p>Click on the image to view the products</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
