import ourColors from "../inc/ourColors"
import { ToolbarGroup, ToolbarButton, Popover, Button, PanelBody, PanelRow, ColorPalette } from "@wordpress/components"
import { 
    RichText, 
    InspectorControls,
    BlockControls,
    __experimentalLinkControl as LinkControl,
    getColorObjectByColorValues
    } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import { link, styles } from "@wordpress/icons"
import { useState } from "@wordpress/element"

registerBlockType("ourblocktheme/genericbutton", {
  title: "Generic Button",
  attributes: {
    text: {type: "string"},
    size: {type: "string", default: "large"},
    linkObject: {type: "object", default: {url: ""} },
    colorName: {type: "string", default: "blue"},
  },
  edit: EditComponent,
  save: SaveComponent
})

function EditComponent(props) {
    const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false)

    function handelTextChange(x) {  
        props.setAttributes({text: x});
    }

    function buttonHandler(props) {
        setIsLinkPickerVisible(prev => !prev); 
    }

    function handleLinkChange(newLink) {
        props.setAttributes({linkObject: newLink});
    } 

    function handleColorChange(colorCode) {
        const {name} = getColorObjectByColorValue(ourColors, colorCode)
        props.setAttributes({colorName: name});
    }

    const currentColorValue = ourColors.filter(color=>{
        return color.name == props.attributes.colorName
    })[0].color

    return (
        <>
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton onClick={buttonHandler} icon={link} />
            </ToolbarGroup>
            <ToolbarGroup>
                <ToolbarButton isPressed={props.attributes.size === "large"} onClick={()=>props.setAttributes({size: "large"})}>Large</ToolbarButton>
            </ToolbarGroup>
            <ToolbarGroup>
                <ToolbarButton isPressed={props.attributes.size === "medium"} onClick={()=>props.setAttributes({size: "medium"})}>Medium</ToolbarButton>
            </ToolbarGroup>
            <ToolbarGroup>
                <ToolbarButton isPressed={props.attributes.size === "small"} onClick={()=>props.setAttributes({size: "small"})}>Small</ToolbarButton>
            </ToolbarGroup>
        </BlockControls>
        <InspectorControls>
            <PanelBody title="Color" initialOpen={true}>
                <PanelRow>
                    <ColorPalette disableCustomColors={true} clearable={false} colors={ourColors} value={currentColorValue} onChange={handleColorChange} />
                </PanelRow>
            </PanelBody>
        </InspectorControls>
        <RichText allowedFormats={[]} 
        tagName="a" className={`btn btn--${props.attributes.size} btn--${props.attributes.colorName}`} 
        value={props.attributes.text} onChange={handelTextChange} 
        />
        {isLinkPickerVisible && (
            <Popover position="middle center">
                <LinkControl setttings={[]} value={props.attributes.linkObject} onChange={handleLinkChange} />
                <button variant="primary" onClick={() => setIsLinkPickerVisible(false)} style={{ display:"block", width: "100%" }}>
                    Confirm Link
                    </button>
            </Popover>
        )}
        </>
    )
}

function SaveComponent(props) {
    return <a href={props.attributes.linkObject.url} className={`btn htn--${props.attributes.size } btn--${props.attributes.colorName}`}>
        {props.attributes.text}
    </a>
}
