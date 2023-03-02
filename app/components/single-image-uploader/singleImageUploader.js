import React from 'react';
import ReactAvatarEditor from 'react-avatar-editor';
import {withStyles, Slider} from "@material-ui/core";
import PropTypes from 'prop-types';
import lodash from 'lodash';

const MIN_SCALE = 1;
const MAX_SCALE = 4;

class SingleImageUploader extends React.Component{


    constructor(props, context) {
        super(props, context);
        this.editor = React.createRef();

        this.handleImageChange = this.handleImageChange.bind(this);
    }

    state = {
        image: this.props.image,
        scale: 1.2
    };

    handleScaleChange = (e, scale) => {
        this.setState({
            scale: scale
        })
    };

    handleImageChange = () => {
        if (this.editor) {
            const image = this.editor.current.getImageScaledToCanvas().toDataURL();
            this.props.onImageChange(image);
        }
    };

    render() {
        const {width, height, borderRaidius,border} = this.props;
        return (
            <div style={{textAlign: 'center'}}>
                <ReactAvatarEditor
                    ref={this.editor}
                    image={this.state.image}
                    width={width}
                    height={height}
                    border={border}
                    borderRadius={borderRaidius}
                    color={[255, 255, 255, 0.3]} // RGBA
                    scale={this.state.scale}
                    rotate={0}
                    onImageChange={lodash.debounce(this.handleImageChange, 400)}
                    onImageReady={this.handleImageChange}
            />
                <PrettoSlider valueLabelDisplay="auto" aria-label="Zoom Image"
                              onChange={this.handleScaleChange}
                              value={this.state.scale}
                              min={MIN_SCALE}
                              max={MAX_SCALE}
                              step={0.02}
                              valueLabelFormat={v => 'x'.concat(v)}
                />
            </div>
        );
    }
}

const PrettoSlider = withStyles({
    root: {
        color: '#e64a19',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

SingleImageUploader.defaultProps = {
    width: 320,
    height: 320,
    borderRaidius: 0,
    border: [0,0],
};
SingleImageUploader.propsType = {
    image: PropTypes.string,
    onImageChange: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
    borderRaidius: PropTypes.number,
    border: PropTypes.array,
};


export default SingleImageUploader;