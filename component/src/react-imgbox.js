'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    
    onClick: PropTypes.func,
    onMouseMove: PropTypes.func,

    x: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    y: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    x2: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    y2: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    w: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    h: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),

    defaultSettings: PropTypes.object,

    // extra messages
    debug: PropTypes.bool,

    // nice name, for debugging
    name: PropTypes.string,

    // map of highlight styles
    markStyle: PropTypes.object,

    // Is now just normal className for ImgBox
    // Space separated classes
    markClass: PropTypes.string,

    // edit - edit coordinate box
    edit: PropTypes.bool,

    // Callback to save box co-ordinates. You are responsible for changing the props if you want to keep these settings
    saveBox: PropTypes.func
}

const defaultPropSettings = {

    id: null,
    className: null,
    src: null,
    alt: '',
    onClick: null,
    onMouseMove: null,
    x: undefined, // in actual coords
    y: undefined,
    x2: undefined,
    y2: undefined,
    w: undefined,
    h: undefined,

    defaultSettings: null,

    // extra messages
    debug: false,

    // nice name, for debugging
    name: '',

    // map of highlight styles
    markStyle: {},

    // Is now just normal className for ImgBox
    // Space separated classes
    markClass: '',

    // edit - edit coordinate box
    edit: false,

    // Callback to save box co-ordinates. You are responsible for changing the props if you want to keep these settings
    saveBox: (coord) => {
        console.log('Override "saveBox(coord)" to save coordinates', coord)
    }

}

const mustHaveCss = {
    position: 'absolute',
    pointerEvents: 'none'
}

const containerStyle = {
    position: 'relative'
}

function validateData(data) {

    const d = {}

    if (data.x !== undefined) {
        d.x = +data.x
    }
    if (data.y !== undefined) {
        d.y = +data.y
    }
    if (data.x2 !== undefined) {
        d.x2 = +data.x2
    }
    if (data.y2 !== undefined) {
        d.y2 = +data.y2
    }
    if (data.w !== undefined) {
        d.w = +data.w
    }
    if (data.h !== undefined) {
        d.h = +data.h
    }

    if (d.x === undefined || d.y === undefined) {
        return 'missing one of x,y'
    }

    if (d.w === undefined || d.h === undefined) {
        if (d.x2 === undefined || d.y2 === undefined) {
            return 'missing one of w,h|x2,y2'
        } else {
            d.w = Math.abs(d.x2 - d.x)
            d.h = Math.abs(d.y2 - d.y)
        }
    } else {
        if (d.x2 === undefined || d.y2 === undefined) {
            d.x2 = d.x + d.w
            d.y2 = d.y + d.h
        }
    }
    return d
}

function normaliseCoordinates(sX, sY, eX, eY) {
    let o = {}
    o.x = Math.min(sX, eX)
    o.y = Math.min(sY, eY)
    o.x2 = Math.max(sX, eX)
    o.y2 = Math.max(sY, eY)
    o.w = Math.abs(sX - eX)
    o.h = Math.abs(sY - eY)
    return o
}

// Adapted from https://stackoverflow.com/a/74972380/52070
function isSame (obj1, obj2) {
    if (obj1 === obj2) {
        return true
    }
    if (obj1 === null || obj2 === null) {
        return false
    }
    const obj1Keys = Object.keys(obj1)
    const obj2Keys = Object.keys(obj2)

    return obj1Keys.length === obj2Keys.length && obj1Keys.every((key) => obj1[key] === obj2[key])
}

function objectKeySubtract(o1, o2) {
    if (o1 === null) {
        return null
    }
    let o = {...o1}
    if (o2 === null) {
        return o
    }
    Object.keys(o2).map(k => delete o[k])
    return o
}

const emptyCoordinates = { x: 0, y: 0, x2: 0, y2: 0, w: 0, h: 0 }


export default function ImgBox(props) {

    const REACTJS_IMGBOX_VERSION = '{version}'

    const { defaultSettings } = props
    const imgRef = useRef(null)
    const actualToLayoutRatio = useRef(-1)

    const settings = useMemo(() => {
        let s = { ...defaultPropSettings }
        if (typeof defaultSettings === 'object') {
            s = {...s, ...defaultSettings }
        }
        s = {...s, ...props }
        let others = objectKeySubtract(s, defaultPropSettings)
        s.others = others
        return s
    }, [props, defaultSettings])

    const [editButtonDown, setEditButtonDown] = useState(false)
    const [markerDivStyle, setMarkerDivStyle] = useState(null)
    const [boxInfo, setBoxInfo] = useState(null)

    const debug = useCallback((str, o) => {
        if (settings.debug) {
            const text = 'imgbox: ' + settings.name + ' ' + str
            if (o == undefined) {
                console.log(text)
            } else {
                console.log(text, o)
            }
        }
    }, [settings.debug, settings.name])

    const onResize = useCallback(() => {
        debug('Page resize')
        // Cordinates are based on actual deminsions so don't change
        const bi = { ...boxInfo }
        setBoxInfo(bi)
    }, [debug, boxInfo])


    function editClick(e) {
        let xx = parseInt(e.nativeEvent.layerX / actualToLayoutRatio.current)
        let yy = parseInt(e.nativeEvent.layerY / actualToLayoutRatio.current)
        mouseClick(xx, yy)
    }

    function editMousemove(e) {
        let xx = parseInt(e.nativeEvent.layerX / actualToLayoutRatio.current)
        let yy = parseInt(e.nativeEvent.layerY / actualToLayoutRatio.current)
        mouseMove(xx, yy)
    }

    function mouseMove(xx, yy) {
        if (editButtonDown) {
            let nc = normaliseCoordinates(boxInfo.x, boxInfo.y, xx, yy)
            setBoxInfo(nc)
        }
    }

    function mouseClick(xx, yy) {
        if (editButtonDown) {
            // Second click
            let nc = normaliseCoordinates(boxInfo.x, boxInfo.y, xx, yy)
            setEditButtonDown(!editButtonDown)
            setBoxInfo(nc)
            saveBoxPrivate(nc)
        } else {
            // First click
            let nc = normaliseCoordinates(xx, yy, xx, yy)
            setBoxInfo(nc)
            setEditButtonDown(!editButtonDown)
        }
    }

    function actualToLayerCoords(d) {
        let o = {}
        o.x = Math.floor(d.x * actualToLayoutRatio.current)
        o.y = Math.floor(d.y * actualToLayoutRatio.current)
        o.x2 = Math.floor(d.x2 * actualToLayoutRatio.current)
        o.y2 = Math.floor(d.y2 * actualToLayoutRatio.current)
        o.w = Math.floor(d.w * actualToLayoutRatio.current)
        o.h = Math.floor(d.h * actualToLayoutRatio.current)
        return o
    }

    function saveBoxPrivate(actualCoords) {
        try {
            settings.saveBox(actualCoords)
        } catch (err) {
            console.error('Exception in savebox()', actualCoords, err)
        }
    }


    useEffect(() => {
        debug('Add page window resize listener')
        window.addEventListener('resize', onResize)

        return () => {
            debug('Add page window resize listener')
            window.removeEventListener('resize', onResize)
        }
    }, [debug, onResize])

    useEffect(() => {
        debug('useEffect:settings', settings)
        let width = imgRef.current?.width
        let realWidth = imgRef.current?.naturalWidth
        if (realWidth == 0) {
            debug('Real image width is zero. Bad load?')
            realWidth = width
        }
        actualToLayoutRatio.current = width / realWidth
        debug(`actualToLayoutRatio ${width}/${realWidth} = ${actualToLayoutRatio.current}`)

        debug('settings:', settings)
        let propCoords = validateData(settings)
        debug('propCoords - should be a string:', propCoords)
        if (typeof propCoords === 'string') {
            //propCoords = {w:0, h: 0} //emptyCoordinates
            propCoords = emptyCoordinates
            debug('newProps-coord', propCoords)
        }

        let d = {}

        if (editButtonDown === true && boxInfo !== null) {
            d = boxInfo
        } else {
            d = propCoords
        }

        if (d.w === 0 && d.h === 0) {
            if (markerDivStyle) {
                debug('useEffect:setMarkerDivStyle:null')
                setMarkerDivStyle(null)
            }
            debug('nothing to show', d)
            return
        }

        let nc = normaliseCoordinates(d.x, d.y, d.x2, d.y2)
        let ac = actualToLayerCoords(nc)

        let pl = imgRef.current?.style.paddingLeft === '' ? 0 : parseInt(imgRef.current?.style.paddingLeft)
        let pt = imgRef.current?.style.paddingLeft === '' ? 0 : parseInt(imgRef.current?.style.paddingTop)

        let padded_left = pl + ac.x
        let padded_top = pt + ac.y

        let pos = {
            left: padded_left + 'px',
            top: padded_top + 'px',
            width: ac.w + 'px',
            height: ac.h + 'px',
        }
        debug('pos=' + JSON.stringify(pos))

        let css = { ...settings.markStyle, ...pos, ...mustHaveCss }
        if (isSame(css, markerDivStyle) === false) {
            debug('useEffect:setMarkerDivStyle:css')
            setMarkerDivStyle(css)
        }
    }, [editButtonDown, boxInfo, markerDivStyle, debug, settings]) // editButtonDown, boxInfo, debug, settings.markStyle, props.x, props.y, props.x2, props.y2, props.w, props.h])

    function proxyOnClick(e) {
        editClick(e)
        if (typeof settings.onClick === 'function') {
            try {
                settings.onClick(e)
            } catch (err) {
                console.error('Error in user onClick()')
            }
        }
    }

    function proxyOnMouseMove(e) {
        editMousemove(e)
        if (typeof settings.onMouseMove === 'function') {
            try {
                settings.onMouseMove(e)
            } catch (err) {
                console.log('Error in user onMouseMove()')
            }
        }
    }

    debug('Version: ' + REACTJS_IMGBOX_VERSION)

    // They won't be able to see anything without these set!
    if (settings.markClass === '' && typeof settings.markStyle !== 'object') {
        debug('must have markClass, markStyle or both')
    }

    const ibOnClick = settings.edit === true ? proxyOnClick : settings.onClick
    const ibOnMouseMove = editButtonDown ? proxyOnMouseMove : settings.onMouseMove

    let markerDiv = null
    if (markerDivStyle !== null) {
        if (settings.markClass !== '') {
            markerDiv = <div style={markerDivStyle} className={settings.markClass}></div>
        } else {
            markerDiv = <div style={markerDivStyle}></div>
        }
    } else {
        debug('no marker to display')
    }

    debug('render')
    return (
        <div style={containerStyle}>
            <img
                ref={imgRef}
                id={settings.id} className={settings.className}
                src={settings.src} alt={settings.alt}
                onClick={ibOnClick}
                onMouseMove={ibOnMouseMove}
                {...settings.others}
            />
            {markerDiv}
        </div>
    )

}

ImgBox.propTypes = propTypes
