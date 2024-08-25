fx_version('cerulean')
games({ 'gta5' })

auther('GunWare')
description('Script de customisation de personnage pour FiveM. Made by GunWare')

shared_scripts {
    '@ox_lib/init.lua',
}

shared_script('config.lua')

ui_page('html/index.html')
lua54('yes')

files({
    'html/**',
    'config.json',
})

server_scripts({
    --'@mysql-async/lib/MySQL.lua', -- Assurez-vous d'inclure uniquement une seule bibliothèque MySQL
    '@oxmysql/lib/MySQL.lua',
    'src/server/functions/**',
    'src/server/main.lua',
    'src/server/server.js',
})

client_scripts({
    'src/client/functions/**',
    'src/client/main.lua',
})

dependencies({
    'screenshot-basic',
    'yarn',
    'webpack',
})

escrow_ignore {
    'config.lua',
    'items.lua'
}

dependency '/assetpacks'