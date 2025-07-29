# Art Direction & Landmark Specification

This document outlines how world builders can define special landmarks and styling choices for the procedural world engine. These entries extend the normal generation pipeline with bespoke rules or assets, letting the project capture must-have set pieces or unique visual styles.

## Goals
- Allow teams to list required landmarks (e.g., colossal trees, crater lakes, ancient ruins).
- Provide hooks for overriding biome palettes or terrain features in specific regions.
- Keep the format simple so additional tools or scripts can consume it later.

## Format
Landmarks and styling directives are described in a YAML file. Each entry specifies an identifier, location information and any special rules or visual tags. The world generator can query this file during the appropriate generation stage.

### Example
```yaml
landmarks:
  - id: "crater_lake"
    description: "Massive crater with a central lake and surrounding cliffs"
    location:
      # World coordinates or a named region to target
      x: 1234
      y: 5678
    style:
      biome_override: "lake"
      palette: "volcanic"
```

Additional fields can be added as needed (e.g., size, elevation bias, local vegetation). Tools may validate or expand these entries before generation.

## Integration Notes
1. Load the YAML file before terrain generation begins.
2. When processing a chunk, check if any landmark overlaps the region and apply its rules.
3. Styling tags (like `palette`) can override the default biome palette during rendering.

This template provides a starting point for capturing art direction requirements, ensuring that special landmarks and visual tweaks are incorporated consistently.