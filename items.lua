["tshirt"] = {
    label = "T-shirt",
    weight = 0.05,
    stack = false,
    close = true,
    consume = 0,
    client = {
        anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
        usetime = 1500
    },
    server= {
        export = 'cfx-clohtingStore.useskin'
    },
    buttons = {
        {
            label = 'Rename',
            action = function(slot)
                local input = lib.inputDialog('Dialog title', {
                    {type = 'input', label = 'Nom', description = 'Some name', required = true, min = 1, max = 7},
                })
                TriggerServerEvent('cfx-clohtingStore:rename', slot, input[1])
            end
        },
    },
},

["pants"] = {
    label = "Pants",
    weight = 0.05,
    stack = false,
    close = true,
    consume = 0,
    client = {
        anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
        usetime = 1500
    },
    server= {
        export = 'cfx-clohtingStore.useskin'
    },
    buttons = {
        {
            label = 'Rename',
            action = function(slot)
                local input = lib.inputDialog('Dialog title', {
                    {type = 'input', label = 'Nom', description = 'Some name', required = true, min = 1, max = 7},
                })
                TriggerServerEvent('cfx-clohtingStore:rename', slot, input[1])
            end
        },
    },
},

["shoes"] = {
    label = "Shoes",
    weight = 0.05,
    stack = false,
    close = true,
    consume = 0,
    client = {
        anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
        usetime = 1500
    },
    server= {
        export = 'cfx-clohtingStore.useskin'
    },
    buttons = {
        {
            label = 'Rename',
            action = function(slot)
                local input = lib.inputDialog('Dialog title', {
                    {type = 'input', label = 'Nom', description = 'Some name', required = true, min = 1, max = 7},
                })
                TriggerServerEvent('cfx-clohtingStore:rename', slot, input[1])
            end
        },
    },
},

["helmet"] = {
    label = "Helmet",
    weight = 0.05,
    stack = false,
    close = true,
    consume = 0,
    client = {
        anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
        usetime = 1500
    },
    server= {
        export = 'cfx-clohtingStore.useskin'
    },
    buttons = {
        {
            label = 'Rename',
            action = function(slot)
                local input = lib.inputDialog('Dialog title', {
                    {type = 'input', label = 'Nom', description = 'Some name', required = true, min = 1, max = 7},
                })
                TriggerServerEvent('cfx-clohtingStore:rename', slot, input[1])
            end
        },
    },
},

["glasses"] = {
    label = "Glasses",
    weight = 0.05,
    stack = false,
    close = true,
    consume = 0,
    client = {
        anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
        usetime = 1500
    },
    server= {
        export = 'cfx-clohtingStore.useskin'
    },
    buttons = {
        {
            label = 'Rename',
            action = function(slot)
                local input = lib.inputDialog('Dialog title', {
                    {type = 'input', label = 'Nom', description = 'Some name', required = true, min = 1, max = 7},
                })
                TriggerServerEvent('cfx-clohtingStore:rename', slot, input[1])
            end
        },
    },
},

["mask"] = {
    label = "Mask",
    weight = 0.05,
    stack = false,
    close = true,
    consume = 0,
    client = {
        anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
        usetime = 1500
    },
    server= {
        export = 'cfx-clohtingStore.useskin'
    },
    buttons = {
        {
            label = 'Rename',
            action = function(slot)
                local input = lib.inputDialog('Dialog title', {
                    {type = 'input', label = 'Nom', description = 'Some name', required = true, min = 1, max = 7},
                })
                TriggerServerEvent('cfx-clohtingStore:rename', slot, input[1])
            end
        },
    },
},

["bags"] = {
    label = "Bags",
    weight = 0.05,
    stack = false,
    close = true,
    consume = 0,
    client = {
        anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
        usetime = 1500
    },
    server= {
        export = 'cfx-clohtingStore.useskin'
    },
    buttons = {
        {
            label = 'Rename',
            action = function(slot)
                local input = lib.inputDialog('Dialog title', {
                    {type = 'input', label = 'Nom', description = 'Some name', required = true, min = 1, max = 7},
                })
                TriggerServerEvent('cfx-clohtingStore:rename', slot, input[1])
            end
        },
    },
},

["bproof"] = {
    label = "Bulletproof",
    weight = 0.05,
    stack = false,
    close = true,
    consume = 0,
    client = {
        anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
        usetime = 1500
    },
    server= {
        export = 'cfx-clohtingStore.useskin'
    },
    buttons = {
        {
            label = 'Rename',
            action = function(slot)
                local input = lib.inputDialog('Dialog title', {
                    {type = 'input', label = 'Nom', description = 'Some name', required = true, min = 1, max = 7},
                })
                TriggerServerEvent('cfx-clohtingStore:rename', slot, input[1])
            end
        },
    },
},

["watches"] = {
    label = "Watches",
    weight = 0.05,
    stack = false,
    close = true,
    consume = 0,
    client = {
        anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
        usetime = 1500
    },
    server= {
        export = 'cfx-clohtingStore.useskin'
    },
    buttons = {
        {
            label = 'Rename',
            action = function(slot)
                local input = lib.inputDialog('Dialog title', {
                    {type = 'input', label = 'Nom', description = 'Some name', required = true, min = 1, max = 7},
                })
                TriggerServerEvent('cfx-clohtingStore:rename', slot, input[1])
            end
        },
    },
},

["bracelets"] = {
    label = "Bracelets",
    weight = 0.05,
    stack = false,
    close = true,
    consume = 0,
    client = {
        anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
        usetime = 1500
    },
    server= {
        export = 'cfx-clohtingStore.useskin'
    },
    buttons = {
        {
            label = 'Rename',
            action = function(slot)
                local input = lib.inputDialog('Dialog title', {
                    {type = 'input', label = 'Nom', description = 'Some name', required = true, min = 1, max = 7},
                })
                TriggerServerEvent('cfx-clohtingStore:rename', slot, input[1])
            end
        },
    },
},

["chain"] = {
    label = "Chain",
    weight = 0.05,
    stack = false,
    close = true,
    consume = 0,
    client = {
        anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
        usetime = 1500
    },
    server= {
        export = 'cfx-clohtingStore.useskin'
    },
    buttons = {
        {
            label = 'Rename',
            action = function(slot)
                local input = lib.inputDialog('Dialog title', {
                    {type = 'input', label = 'Nom', description = 'Some name', required = true, min = 1, max = 7},
                })
                TriggerServerEvent('cfx-clohtingStore:rename', slot, input[1])
            end
        },
    },
},

["arms"] = {
    label = "Arms",
    weight = 0.05,
    stack = false,
    close = true,
    consume = 0,
    client = {
        anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
        usetime = 1500
    },
    server= {
        export = 'cfx-clohtingStore.useskin'
    },
    buttons = {
        {
            label = 'Rename',
            action = function(slot)
                local input = lib.inputDialog('Dialog title', {
                    {type = 'input', label = 'Nom', description = 'Some name', required = true, min = 1, max = 7},
                })
                TriggerServerEvent('cfx-clohtingStore:rename', slot, input[1])
            end
        },
    },
},

["torso"] = {
    label = "Torso",
    weight = 0.05,
    consume = 0,
    stack = false,
    close = true,
    client = {
        anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
        usetime = 1500
    },
    server= {
        export = 'cfx-clohtingStore.useskin'
    },
    buttons = {
        {
            label = 'Rename',
            action = function(slot)
                local input = lib.inputDialog('Dialog title', {
                    {type = 'input', label = 'Nom', description = 'Some name', required = true, min = 1, max = 7},
                })
                TriggerServerEvent('cfx-clohtingStore:rename', slot, input[1])
            end
        },
    },
},

["tenue_item"] = {
    label = "Tenue",
    weight = 0.05,
    consume = 0,
    stack = false,
    close = true,
    client = {
        anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
        usetime = 3500
    },
    server= {
        export = 'cfx-clohtingStore.usetenue'
    },
},