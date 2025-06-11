import React from "react";
import { Truck, Clock, Shield, MapPin } from "lucide-react";
import { SafeMap } from "../ui/SafeMap";
import { DeliveryZoneBanner } from "../ui/MarketingBanner";
import { useLocation } from "../../hooks/useLocation";

export const GoogleMapsSection = () => {
  const { location } = useLocation();

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#262729] mb-6">
            Visit Our Store
          </h2>
          <p className="text-xl text-[#262729]/70 max-w-3xl mx-auto leading-relaxed">
            Located in the heart of Hommadevanahalli, Bangalore. We deliver
            fresh, premium pork within a 5km radius. Experience our commitment
            to quality and freshness firsthand.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
          <div>
            <SafeMap
              height="500px"
              showDirections={true}
              showStoreInfo={true}
              className="rounded-xl overflow-hidden shadow-lg"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-[#262729] mb-8">
                Why Choose Our Location?
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#C72C41] to-[#E73C56] rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#262729] mb-3">
                      Lightning Fast Delivery
                    </h4>
                    <p className="text-[#262729]/70 text-base leading-relaxed">
                      Experience delivery in just 45-90 minutes within our 5km
                      radius from Hommadevanahalli. Fresh meat, delivered fresh.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#262729] mb-3">
                      Premium Quality Assured
                    </h4>
                    <p className="text-[#262729]/70 text-base leading-relaxed">
                      100% fresh, antibiotic-free pork sourced directly from
                      trusted local farmers. Quality guaranteed or money back.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#262729] mb-3">
                      Extended Store Hours
                    </h4>
                    <p className="text-[#262729]/70 text-base leading-relaxed">
                      Open from 9:00 AM to 9:00 PM daily, ensuring you can
                      always get fresh meat when you need it most.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Store Info Card */}
            <div className="bg-gradient-to-br from-[#262729] to-[#3a3a3c] text-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#C72C41] rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Store Information</h4>
                  <p className="text-white/70">Your local premium meat store</p>
                </div>
              </div>

              <div className="space-y-4 text-white/90">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C72C41] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-white/70">
                      Hommadevanahalli, Bangalore, Karnataka 560048
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#C72C41] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Operating Hours</p>
                    <p className="text-white/70">9:00 AM - 9:00 PM (Daily)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-[#C72C41] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Delivery Range</p>
                    <p className="text-white/70">
                      5km radius from store location
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Zone Banner */}
            {location && (
              <div className="mt-6">
                <DeliveryZoneBanner userLocation={location} />
              </div>
            )}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-[#C72C41] to-[#E73C56] text-white py-12 px-8 rounded-2xl shadow-xl">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Experience Premium Quality?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Visit our store today or place an order for fresh delivery to your
              doorstep. Taste the difference quality makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/dir/?api=1&destination=12.9698,77.6275&travelmode=driving",
                    "_blank",
                  )
                }
                className="bg-white text-[#C72C41] font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Get Directions
              </button>
              <button
                onClick={() => (window.location.href = "/products")}
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-[#C72C41] transition-colors duration-300"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
