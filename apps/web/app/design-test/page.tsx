import {
  Button,
  Card,
  Badge,
  CircularProgress,
  ProgressBar,
  MetricCard,
  MissionCard,
  AchievementCard,
} from "@/components/design-system";


export default function DesignTestPage() {
  return (
    <main className="min-h-screen bg-[#070B16] p-10 text-white space-y-8">

      <h1 className="text-3xl font-bold">
        Sakshion Design System
      </h1>


      <section className="flex gap-4">
        <Button>
          Primary Button
        </Button>

        <Badge>
          AI Student
        </Badge>
      </section>


      <Card>
        Glass Card Test
      </Card>


      <CircularProgress
        value={75}
      />


      <ProgressBar
        value={60}
      />


      <MetricCard
        label="Mastery"
        value="87%"
      />

    </main>
  );
}