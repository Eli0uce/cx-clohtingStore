IS_SERVER = IsDuplicityVersion()

Config = {}

ESX = exports['es_extended']:getSharedObject()


Config.PATH = "https://raw.githubusercontent.com/BI0UBI0U/images-clothingshop/master/"

--[[

    ## Documentation pour la Capture d'Images

    html/asset/icon/items


    Config.PATH = "https://raw.githubusercontent.com/votreusername/votrerepo/main/items/"

    Mode Avancé

      - `/screenshot`
      - `/screenshot2`

    Mode Sexe Spécifique

      - `/screenshotf` pour le mode féminin
      - `/screenshotm` pour le mode masculin


    En remplaçant `votreusername` et `votrerepo` par votre nom d'utilisateur et le nom de votre dépôt, les liens seront corrects.
]]


if not IS_SERVER then
    --- staff
    Config.EditMagasin = false
    Config.PointsOrInteriors = true --- false pour les points et true pour les intérieurs (ox target)

    Config.StoreList = {
        { x = 72.254,    y = -1399.102, z = 28.376 },
        { x = -703.776,  y = -152.258,  z = 36.415 },
        { x = -167.863,  y = -298.969,  z = 38.733 },
        { x = 428.694,   y = -800.106,  z = 28.491 },
        { x = -829.413,  y = -1073.710, z = 10.328 },
        { x = -1447.797, y = -242.461,  z = 48.820 },
        { x = 11.632,    y = 6514.224,  z = 30.877 },
        { x = 123.646,   y = -219.440,  z = 53.557 },
        { x = 1696.291,  y = 4829.312,  z = 41.063 },
        { x = 618.093,   y = 2759.629,  z = 41.088 },
        { x = 1190.550,  y = 2713.441,  z = 37.222 },
        { x = -1193.429, y = -772.262,  z = 16.324 },
        { x = -3172.496, y = 1048.133,  z = 19.863 },
        { x = -1108.441, y = 2708.923,  z = 18.107 },
    }




    for k, v in pairs(Config.StoreList) do
        local blips = AddBlipForCoord(v.x, v.y, v.z)
        SetBlipSprite(blips, 73)
        SetBlipScale(blips, 0.7)
        SetBlipColour(blips, 2)
        SetBlipAsShortRange(blips, true)
        BeginTextCommandSetBlipName("STRING")
        AddTextComponentString("Magasin de vêtements")
        EndTextCommandSetBlipName(blips)
    end

    TriggerServerCallback = function(name, cb, ...)
        ESX.TriggerServerCallback(name, cb, ...)
    end



    Config.HelpText = function(msg)
        ESX.ShowHelpNotification(msg)
    end

    Config.Notification = function(msg)
        ESX.ShowNotification(msg)
    end

    Config.ResetSkin = function()
        ESX.TriggerServerCallback('esx_skin:getPlayerSkin', function(skin)
            TriggerEvent('skinchanger:loadSkin', skin)
        end)
    end

    Config.Marker = function(coords)
        DrawMarker(1, coords.x, coords.y, coords.z, 0, 0, 0, 0, 0, 0, 1.0, 1.0, 1.0, 255, 0, 0, 200, false, false, 2,
            false, false, false, false)
    end

    --- Event
    Config.skinchangerchange = "skinchanger:change"
    Config.getSkin = "skinchanger:getSkin"
    Config.saveSkin = "illenium-appearance:server:saveAppearance" --  illenium-appearance:server:saveAppearance
    Config.Drawdistance = 10.0

    local lastprops_drawable = 0
    if GetResourceState('illenium-appearance') == 'started' then
        RegisterNetEvent("skinchanger:change")
        AddEventHandler("skinchanger:change", function(_type, value)
            local componentNames = {
                ["tshirt"] = 8,
                ["pants"] = 4,
                ["shoes"] = 6,
                ["bproof"] = 9,
                ["chain"] = 7,
                ["arms"] = 3,
                ["torso"] = 11,
                ["bags"] = 5,
                ["mask"] = 1 -- Note: mask is a component
            }

            -- Prop names and their IDs
            local propNames = {
                ["bracelets"] = 7,
                ["helmet"] = 0,
                ["glasses"] = 1,
                ["watches"] = 6,
                ["ears"] = 2
            }

            -- Check if the provided type exists in componentNames or propNames
            local baseType = _type:gsub("_1", ""):gsub("_2", "")
            local component_id = componentNames[baseType]
            local prop_id = propNames[baseType]


            local playerPed = PlayerPedId()
            local pedAppearance = exports['illenium-appearance']:getPedAppearance(playerPed)
            local components = pedAppearance.components
            local props = pedAppearance.props

            if component_id then
                -- Handle component
                for _, v in pairs(components) do
                    if v.component_id == component_id then
                        if _type:find("_1") or _type == baseType then
                            v.drawable = value
                        elseif _type:find("_2") then
                            v.texture = value
                        end
                        exports['illenium-appearance']:setPedComponent(playerPed, v)
                    end
                end
            elseif prop_id then
                for _, v in pairs(props) do
                    if v.prop_id == prop_id then
                        if _type:find("_1") or _type == baseType then
                            v.drawable = value
                            lastprops_drawable = value
                        elseif _type:find("_2") then
                            v.texture = value
                        end
                        v.drawable = lastprops_drawable
                        exports['illenium-appearance']:setPedProp(playerPed, v)
                    end
                end
            end
        end)
    end

    -- Separate event handlers to set components and props
    RegisterNetEvent('setPedComponent', function(components)
        exports["illenium-appearance"]:setPedComponent(PlayerPedId(), components)
    end)

    RegisterNetEvent('setPedProp', function(props)
        exports["illenium-appearance"]:setPedProp(PlayerPedId(), props)
    end)

    -- Save the player's appearance
    RegisterNetEvent('savePlayer', function()
        local playerPed = PlayerPedId()
        local appearance = exports['illenium-appearance']:getPedAppearance(playerPed)
        TriggerServerEvent("illenium-appearance:server:saveAppearance", appearance)
    end)



    Config.openMessage = "Press [E] to open store"

    Config.Vente = {}


    RegisterNetEvent("cfx-saveSkin", function()
        exports["cfx-clohtingStore"]:PedScreenDestroy()
        if lib.progressCircle({
                duration = 500,
                position = 'bottom',
                useWhileDead = false,
                canCancel = false,
                disable = {
                    car = true,
                },
                anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
            }) then
            if GetResourceState('illenium-appearance') == 'started' then
                local playerPed = PlayerPedId()
                local appearance = exports['illenium-appearance']:getPedAppearance(playerPed)
                TriggerServerEvent("illenium-appearance:server:saveAppearance", appearance)
            else
                TriggerEvent(Config.getSkin, function(skin)
                    TriggerServerEvent(Config.saveSkin, skin)
                end)
            end
        end
    end)
end

if IS_SERVER then
    ServerArms = {
        ["m"] = { --- male
            --[1] = 35, --- torse 1 / bras 35
        },
        ["f"] = { -- female
            --["1"] = 55,--- torse 1 / bras 35
        }
    }

    function GetArms(sex, drawble)
        return ServerArms[sex][drawble] or nil
    end

    if GetResourceState('ox_inventory') ~= 'started' then
        while true do
            Citizen.Wait(0)
            print("^1start ox_inventory before starting this script")
        end
    end

    function ServerCallback(name, cb)
        ESX.RegisterServerCallback(name, cb)
    end

    GetPlayerFromId = function(src)
        return ESX.GetPlayerFromId(src)
    end

    local function IsStaff(src)
        local xPlayer = ESX.GetPlayerFromId(src)
        if xPlayer.getGroup() ~= "user" then
            return true
        end
        return false
    end

    RegisterCommand("shop", function(source, args, rawCommand)
        local src = source
        if IsStaff(src) then
            local target = tonumber(args[1])
            if target then
                TriggerClientEvent("interact:clothes", target)
            else
                TriggerClientEvent("interact:clothes", src)
            end
        end
    end)




    Config.getmoney = function(xPlayer)
        return xPlayer.getMoney()
    end
    Config.removemoney = function(xPlayer, price)
        xPlayer.removeMoney(price)
        --your remove money function
    end

    Config.SkinForItem = function(data, src)
        local linkImg = Config.PATH .. data.type .. "/" .. data.sex .. "/" .. data.drawable .. "_.png"
        local success, response = exports.ox_inventory:AddItem(src, data.type, 1, {
            imageurl = linkImg,
            drawable = data.drawable,
            texture = data.texture,
            type = data.type,
            sex = data.sex,
        })
    end

    Config.SkinForTenue = function(data, src)
        local xPlayer = GetPlayerFromId(src)
        Config.removemoney(xPlayer, data.price)
        local sex = data.sex
        data.sex = nil
        data.price = nil
        local success, response = exports.ox_inventory:AddItem(src, "tenue_item", 1, {
            data = data,
            sex = sex
        })
    end

    exports('useskin', function(event, item, inventory, slot, data)
        if event == 'usingItem' then
            local itemSlot = exports.ox_inventory:GetSlot(inventory.id, slot)
            TriggerClientEvent('skinchanger:change', inventory.id, itemSlot.metadata.type .. "_1",
                tonumber(itemSlot.metadata.drawable))
            TriggerClientEvent('skinchanger:change', inventory.id, itemSlot.metadata.type .. "_2",
                tonumber(itemSlot.metadata.texture))
            TriggerClientEvent('cfx-saveSkin', inventory.id)
        end
    end)

    exports('usetenue', function(event, item, inventory, slot, data)
        if event == 'usingItem' then
            local itemSlot = exports.ox_inventory:GetSlot(inventory.id, slot)
            local tenue = itemSlot.metadata.data
            for _, v in pairs(tenue) do
                local k = v.type
                TriggerClientEvent('skinchanger:change', inventory.id, k .. "_1", tonumber(v.drawable))
                TriggerClientEvent('skinchanger:change', inventory.id, k .. "_2", tonumber(v.texture))
            end
            TriggerClientEvent('cfx-saveSkin', inventory.id)
        end
    end)



    RegisterNetEvent("cfx-clohtingStore:rename")
    AddEventHandler("cfx-clohtingStore:rename", function(slot, name)
        local src = source
        item = exports.ox_inventory:GetSlot(src, slot)
        item.metadata.label = name
        exports.ox_inventory:SetMetadata(src, slot, item.metadata)
    end)






    defaultClothing = {
        ["f"] = {
            ["tshirt"] = { draw = 15, text = 0 },
            ["pants"] = { draw = 15, text = 3 },
            ["shoes"] = { draw = 35, text = 0 },
            ["helmet"] = { draw = -1, text = -1 },
            ["glasses"] = { draw = 5, text = 0 },
            ["bags"] = { draw = -1, text = 0 },
            ["mask"] = { draw = -1, text = 0 },
            ["bproof"] = { draw = -1, text = 0 },
            ["watches"] = { draw = -1, text = -1 },
            ["bracelets"] = { draw = -1, text = -1 },
            ["chain"] = { draw = -1, text = 0 },
            ["arms"] = { draw = 4, text = 0 },
            ["torso"] = { draw = 5, text = 0 },
            ["ears"] = { draw = -1, text = 0 }
        },
        ["m"] = {
            ["tshirt"] = { draw = 15, text = 0 },
            ["pants"] = { draw = 14, text = 0 },
            ["shoes"] = { draw = 34, text = 0 },
            ["helmet"] = { draw = -1, text = 0 },
            ["glasses"] = { draw = -1, text = 0 },
            ["bags"] = { draw = -1, text = 0 },
            ["mask"] = { draw = -1, text = 0 },
            ["bproof"] = { draw = -1, text = 0 },
            ["watches"] = { draw = -1, text = -1 },
            ["bracelets"] = { draw = -1, text = -1 },
            ["chain"] = { draw = -1, text = 0 },
            ["arms"] = { draw = 15, text = 0 },
            ["torso"] = { draw = 15, text = 0 },
            ["ears"] = { draw = -1, text = 0 }
        },
    }


    defaultClothing.after = { --- quand tu retire un torse
        ["m"] = {
            ["arms"] = 10,
        },
        ["f"] = {
            ["arms"] = 10,
        }
    }
end
