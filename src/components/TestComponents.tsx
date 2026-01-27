import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import WindowFrame from "@/components/WindowFrame";

export default function TestComponents() {
  return (
    <div className="p-8">
      <WindowFrame title="~/test-components" onClose={() => console.log("Close clicked")}>
        <div className="space-y-10">
          <section className="space-y-4">
            <h2 className="font-mono text-sm tracking-widest uppercase text-foreground/80">
              Buttons
            </h2>
            <div className="flex flex-wrap gap-3">
              <Button>Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Icon button">
                +
              </Button>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="font-mono text-sm tracking-widest uppercase text-foreground/80">
              Card
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/80">
                  This is the card content area.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="secondary">Cancel</Button>
                <Button>Confirm</Button>
              </CardFooter>
            </Card>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="font-mono text-sm tracking-widest uppercase text-foreground/80">
              Badge
            </h2>
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="font-mono text-sm tracking-widest uppercase text-foreground/80">
              Tooltip
            </h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tooltip text</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="font-mono text-sm tracking-widest uppercase text-foreground/80">
              Separator
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-foreground/80">Left</span>
              <Separator orientation="vertical" className="h-6" />
              <span className="text-sm text-foreground/80">Right</span>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="font-mono text-sm tracking-widest uppercase text-foreground/80">
              Input & Textarea
            </h2>
            <div className="grid gap-3 max-w-xl">
              <Input placeholder="Type here..." />
              <Textarea placeholder="Multi-line text..." />
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h2 className="font-mono text-sm tracking-widest uppercase text-foreground/80">
              WindowFrame scroll test
            </h2>
            <div className="space-y-2">
              {Array.from({ length: 40 }).map((_, i) => (
                <p key={i} className="text-sm text-foreground/70">
                  Line {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit.
                </p>
              ))}
            </div>
          </section>
        </div>
      </WindowFrame>
    </div>
  );
}
