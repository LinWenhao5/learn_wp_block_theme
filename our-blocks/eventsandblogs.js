wp.blocks.registerBlockType("ourblocktheme/eventsandblogs", {
    title: "Event and Blogs",
    edit: function () {
        return wp.element.createElement("div", {className: "our-placeholder-block"}, "This is a PlaceHolder")
    },
    save: function () {
        return null
    }
})