import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from "react-native-svg";

interface GradientTextProps {
    text: string;
    fontSize?: number;
    width?: number;
    height?: number;
}

const GradientText = ({ text, fontSize = 40, width = 300, height = 60 }: GradientTextProps) => {
    return (
        <Svg height={height} width={width}>
            <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                    <Stop offset="0" stopColor="#ffffff" stopOpacity="1" /> 
                    <Stop offset="1" stopColor="#bfdbfe" stopOpacity="1" />
                </LinearGradient>
            </Defs>
            <SvgText
                fill="url(#grad)"
                stroke="#3b82f6"
                strokeWidth={1}
                fontSize={fontSize}
                fontWeight="bold"
                x={width / 2}
                y={height / 1.5}
                textAnchor="middle"
            >
                {text}
            </SvgText>
        </Svg>
    );
}

export default GradientText;