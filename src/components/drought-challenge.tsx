import { Flame } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { DroughtChallenge } from "@/types/aqua";

interface DroughtChallengeProps {
  challenge: DroughtChallenge;
}

export function DroughtChallengeCard({ challenge }: DroughtChallengeProps) {
  const progress = Math.min(
    100,
    Math.round((challenge.currentReductionPercent / challenge.targetReductionPercent) * 100),
  );

  return (
    <Card
      title="Neighbourhood Drought Alert"
      subtitle="Collective action in your community"
    >
      <div className="rounded-2xl bg-amber-50 p-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-amber-800">
          <Flame className="h-4 w-4" />
          {challenge.title}
        </p>
        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-amber-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-amber-900">
          Community progress: <strong>{challenge.currentReductionPercent}%</strong> /{" "}
          {challenge.targetReductionPercent}% target ({challenge.householdsJoined} homes joined)
        </p>
      </div>
    </Card>
  );
}
