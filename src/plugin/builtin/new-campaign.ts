import type { PluginManifest, PluginModule } from '@/plugin/types';
import { executeCommand } from '@/lib/commands';

export const newCampaignManifest: PluginManifest = {
  id: 'app.plugins.new-campaign',
  name: 'New Campaign',
  version: '0.1.0',
  apiVersion: '1.0',
  contributes: {
    commands: [
      { id: 'app.campaign.new', title: 'New Campaign', shortcut: 'Mod+Shift+N' },
    ],
    toolbar: [
      {
        group: 'campaign',
        items: [
          { type: 'button', command: 'app.campaign.new', icon: 'lucide:box', label: 'New Campaign', order: 1 },
        ],
      },
    ],
  },
};

export const newCampaignModule: PluginModule = {
  commands: {
    'app.campaign.new': async () => {
      await executeCommand('host.prompt.newCampaign');
    },
  },
};
