import React from 'react';
import { ContentSection, ContentGrid } from '@/components/layout/main-content';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <ContentSection
        title="Welcome to Map & Territory"
        description="Hexmap editor for creating atmospheric TTRPG maps"
        actions={
          <Button variant="outline">
            Create New Map
          </Button>
        }
      >
        <Card>
          <CardHeader>
            <CardTitle>Hexmap Editor for TTRPGs</CardTitle>
            <CardDescription>
              Create atmospheric hex maps for dark fantasy and horror campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">🗺️ Hex Grid Editor</h3>
                <p className="text-sm text-muted-foreground">
                  Paint terrain and features on hexagonal grids
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">🎨 Analog Aesthetics</h3>
                <p className="text-sm text-muted-foreground">
                  Gritty, hand-drawn style inspired by Mörk Borg
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">📚 Layer System</h3>
                <p className="text-sm text-muted-foreground">
                  Organize terrain, features, and annotations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      {/* Features Section */}
      <ContentSection
        title="Creative Tools"
        description="Everything you need to create immersive TTRPG hex maps"
      >
        <ContentGrid columns={2} gap="md">
          <Card>
            <CardHeader>
              <CardTitle>Scene Organization</CardTitle>
              <CardDescription>
                Manage your maps and layers with an intuitive scene panel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li>• Multiple hex maps per project</li>
                <li>• Layer visibility controls</li>
                <li>• Terrain and feature organization</li>
                <li>• Quick scene switching</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Creative Toolbar</CardTitle>
              <CardDescription>
                Professional editing tools optimized for hex map creation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li>• Select and transform tools</li>
                <li>• Hex terrain painting</li>
                <li>• Drawing and text tools</li>
                <li>• Keyboard shortcuts (1-9)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Properties Panel</CardTitle>
              <CardDescription>
                Context-sensitive editing controls for selected elements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li>• Tool-specific options</li>
                <li>• Element properties</li>
                <li>• Quick adjustments</li>
                <li>• Real-time preview</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export & Share</CardTitle>
              <CardDescription>
                High-quality exports perfect for printing and digital use
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li>• PNG & SVG export</li>
                <li>• Print-ready quality</li>
                <li>• Social media formats</li>
                <li>• VTT integration ready</li>
              </ul>
            </CardContent>
          </Card>
        </ContentGrid>
      </ContentSection>

      {/* Getting Started Section */}
      <ContentSection title="Next Steps">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Start creating atmospheric hex maps for your TTRPG campaigns. 
                Use the scene panel to organize your maps and the creative toolbar 
                to paint terrain and add features.
              </p>
              <div className="flex gap-2">
                <Button>
                  Create First Map
                </Button>
                <Button variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </ContentSection>
    </div>
  );
}
