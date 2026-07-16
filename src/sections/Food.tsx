import { motion } from "framer-motion";
import { CakeSlice, Coffee, Fish, Shell } from "lucide-react";

import { MenuSign } from "@/components/MenuSign";
import { Reveal, SectionHeading, staggerChild, staggerParent } from "@/components/Reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WaveDivider } from "@/components/WaveDivider";
import { Crab } from "@/components/svg/Crab";
import { cn } from "@/lib/utils";

const dishes = [
  {
    title: "Crabs, Every Way We Can Get Them",
    body: "Our specialty and our namesake. King crab, snow crab, Dungeness, Jersey blue claws, and soft shells in season — steamed, sautéed, and piled high.",
    feature: true,
  },
  {
    title: "Fresh Lobster",
    body: "Picked from the tank the way we've sold them since the 1970 lobster market days.",
    icon: Shell,
  },
  {
    title: "Jumbo Lump Crab Cakes",
    body: "All crab, no filler nonsense. The recipe hasn't changed because it doesn't need to.",
    icon: Fish,
  },
  {
    title: "Day-Boat Scallops",
    body: "Sweet, seared, and never frozen — straight off the boats working these waters.",
    icon: Shell,
  },
  {
    title: "Carrie's Homemade Pies",
    body: "Baked in-house every morning. Regulars know: get the coconut cream before it's gone.",
    icon: CakeSlice,
  },
  {
    title: "Breakfast on the Bay",
    body: "Eggs any style with our famous home fries, served dockside from 8am. The best seat for morning boat traffic.",
    icon: Coffee,
  },
];

export function Food() {
  return (
    <section id="food" className="relative bg-cream-100 text-ink">
      <WaveDivider className="-mt-px text-bay-900" />
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading kicker="What's cooking" title="Straight Off the Dock" />
        <Reveal className="mx-auto mt-4 max-w-xl text-center" delay={0.1}>
          <p className="text-ink/75">
            Breakfast, lunch, and dinner, seven days a week in season.
          </p>
        </Reveal>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {dishes.map((dish) => (
            <motion.div key={dish.title} variants={staggerChild} className={cn(dish.feature && "sm:col-span-2")}>
              <Card
                className={cn(
                  "h-full transition-shadow duration-300 hover:shadow-lifted",
                  dish.feature && "bg-crab-600 text-cream-50",
                )}
              >
                <CardHeader>
                  {dish.feature ? (
                    <Crab className="w-20 text-cream-50" />
                  ) : (
                    dish.icon && (
                      <dish.icon className="size-8 text-crab-600" aria-hidden="true" />
                    )
                  )}
                  <CardTitle className={cn("mt-2", dish.feature ? "text-2xl sm:text-3xl" : "text-bay-900")}>
                    {dish.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className={cn(
                      "leading-relaxed",
                      dish.feature ? "max-w-xl text-cream-50/95" : "text-ink/75",
                    )}
                  >
                    {dish.body}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-14">
          <MenuSign />
        </div>
      </div>
    </section>
  );
}
