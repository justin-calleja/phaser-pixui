# Phaser PixUI

A UI library for the Phaser game engine that provides responsive and customizable UI components, tailored specifically for pixel art games.

## Features

- Responsive UI components that adapt to different screen sizes
- Ensures integer scaling to keep pixel art crisp
- Customizable themes and styling
- Support for buttons, progress bars, text areas, and more
- Built-in positioning helpers for common screen locations
- Written in TypeScript with full type definitions

## Installation and usage

```bash
npm install phaser-pixui
```

Since this library requires Phaser 4 as a peer dependency, make sure you have it installed in your project as well:

```bash
npm install phaser@^4.0.0-rc.6
```

For a usage example, see the bundled [example](https://github.com/skhoroshavin/phaser-pixui/tree/main/example)
project and its corresponding [demo page](https://skhoroshavin.itch.io/phaser-pixui) on itch.io.

## Development

### Building the library

```bash
npm run build
```

### Running the example

First, build the library:

```bash
npm run build
```

Then run the example:

```bash
npm run example
```

Or install example dependencies first if needed:

```bash
npm run example:install
npm run example
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Create a Pull Request

## License

### Code

Copyright (c) 2026 Sergei Khoroshavin

The source code in this repository is licensed under the MIT License.
See the file [LICENSE](https://github.com/skhoroshavin/phaser-pixui/blob/main/LICENSE)
for the full license text.

### Example art assets

The example project included in this repository uses pixel art assets created
by Gabriel Lima aka [tiopalada](https://tiopalada.itch.io). Big thanks to him
for creating beautiful pixel art and putting it into the public domain. Asset pages
([Mana Soul GUI](https://tiopalada.itch.io/tiny-rpg-mana-soul-gui),
[Tiny RPG Font Kit II](https://tiopalada.itch.io/tiny-rpg-font-kit-ii) and
demo version of [Tiny RPG Battle Kit I](https://tiopalada.itch.io/tiny-rpg-battle-kit-1),
the latter was the source of the backgound image) state these assets are CC0
and may be used for any purpose; attribution to the author is appreciated. See
the file [example/public/assets/LICENSE](https://github.com/skhoroshavin/phaser-pixui/blob/main/example/public/assets/LICENSE)
for additional details.
