// import Service from 'resource:///com/github/Aylur/ags/service.js';
// --------------------------------------------------
// Build process for typescript
// --------------------------------------------------
const entry = App.configDir + '/ts/main.ts'
const outdir = '/tmp/ags/js'
const bun = '/home/hankaji/.bun/bin/bun'

try {
    print('Building typescript...')
    await Utils.execAsync([
        bun, 'build', entry,
        '--outdir', outdir,
        '--external', 'resource://*',
        '--external', 'gi://*',
        "--external", "file://*",
    ])
} catch (error) {
    console.error(error)
    App.quit()
}

const { default: config } = await import(`file://${outdir}/main.js`)

export default config
