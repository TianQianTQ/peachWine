import * as d3 from 'd3'
import _ from 'lodash'
// 基础配置
let liquidFillGaugeDefaultSettings = {
        minValue: 0, // 最小值
        maxValue: 100, // 最大值
        circleThickness: 0.05, // 外圆厚度占其半径的百分比。
        circleFillGap: 0.05, // 外圆和波圆之间的间隙的大小占外圆半径的百分比。
        circleColor: '#178BCA', // 外圈的颜色
        waveHeight: 0.05, // 波高作为波浪圆半径的百分比。
        waveCount: 1, // 波浪每圈宽度的全波数。
        waveRiseTime: 1000, // 波浪从0上升到最终高度的时间量（以毫秒为单位）。
        waveAnimateTime: 18000, // 全波进入波浪圈的时间量（以毫秒为单位）。
        waveRise: true, // 控制波浪应该从0上升到它的全高，还是从它的全高开始。
        waveHeightScaling: true, // 控制低填充百分比和高填充百分比时的波浪尺寸缩放。 如果为真，波浪高度在50％填充时达到最大值，最小值在0％和100％填充时达到最大值。 这有助于防止波浪在接近最小或最大填充时使波浪圈显得完全填满或空白。
        waveAnimate: true, // 控制波浪是滚动还是静止。
        waveColor: '#178BCA', // 填充波的颜色。
        waveOffset: 0, // 最初抵消波浪的数量。 0 =没有偏移。 1 =一个完整波的偏移。
        textVertPosition: 0.5, // 在波形圆圈中显示百分比文本的高度。 0 =底部，1 =顶部。
        textSize: 1, // 要在波形圆中显示的文本的相对高度。 1 = 50％
        valueCountUp: true, // 如果为true，则显示的值在加载时从0计数到它的最终值。 如果为false，则显示最终值。
        displayPercent: true, // 如果为true，则在值之后显示％符号。
        textColor: '#045681', // 波形不重叠时的值文本的颜色。
        waveTextColor: '#A4DBf8' // 波形重叠时值文本的颜色。
}
function loadLiquidFillGauge(elementId, value, options, isUpdate) {
    let baseOption = JSON.parse(JSON.stringify(liquidFillGaugeDefaultSettings))
    let config = _.merge(baseOption, options)
    var gauge = d3.select('#' + elementId); // 处理获取的id、class
    // 定义图形所放置位置
    var radius = Math.min(parseInt(gauge.style('width')), parseInt(gauge.style('height'))) / 2;
    var locationX = parseInt(gauge.style('width')) / 2 - radius;
    var locationY = parseInt(gauge.style('height')) / 2 - radius;
    var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value)) / config.maxValue;
    var waveHeightScale; // 控制低百分比和高百分比时的波浪尺寸缩放
    if (config.waveHeightScaling) {
        waveHeightScale = d3.scaleLinear()
            .range([0, config.waveHeight, 0])
            .domain([0, 50, 100]);
    } else {
        waveHeightScale = d3.scaleLinear()
            .range([config.waveHeight, config.waveHeight])
            .domain([0, 100]);
    }
    var textPixels = (config.textSize * radius / 2); // 文本相对高度
    var textFinalValue = parseFloat(value).toFixed(2); // 处理传入的数字保留两位小数
    var textStartValue = config.valueCountUp ? config.minValue : textFinalValue; // 数字变化效果
    var percentText = config.displayPercent ? '%' : ''; // 数字之后显示百分比
    var circleThickness = config.circleThickness * radius; // 外圆厚度
    var circleFillGap = config.circleFillGap * radius; // 外圆和波圆之间的缝隙
    var fillCircleMargin = circleThickness + circleFillGap;
    var fillCircleRadius = radius - fillCircleMargin; // 填充圆的半径
    var waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100); // 波浪高度
    var waveLength = fillCircleRadius * 2 / config.waveCount;
    var waveClipCount = 1 + config.waveCount;
    var waveClipWidth = waveLength * waveClipCount;

    // 舍入功能，以便在值计数时始终显示正确的小数位数。
    var textRounder = function(value) { return Math.round(value); };
    if (parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))) {
        textRounder = function(value) { return parseFloat(value).toFixed(1); };
    }
    if (parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))) {
        textRounder = function(value) { return parseFloat(value).toFixed(2); };
    }

    // Data for building the clip wave area. 波浪圆
    var data = [];
    for (var i = 0; i <= 40 * waveClipCount; i++) {
        data.push({x: i / (40 * waveClipCount), y: (i / (40))});
    }

    // Scales for drawing the outer circle.外圆
    var gaugeCircleX = d3.scaleLinear().range([0, 2 * Math.PI]).domain([0, 1]);
    var gaugeCircleY = d3.scaleLinear().range([0, radius]).domain([0, radius]);

    // Scales for controlling the size of the clipping path.
    var waveScaleX = d3.scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
    var waveScaleY = d3.scaleLinear().range([0, waveHeight]).domain([0, 1]);

    // Scales for controlling the position of the clipping path.
    var waveRiseScale = d3.scaleLinear()
        // 剪切区域大小是填充圆的高度+波高，因此我们定位剪辑波
        // 这样当它在0％时它将与填充圆重叠，并且将完全覆盖填充
        // 圈100％
        .range([(fillCircleMargin + fillCircleRadius * 2 + waveHeight), (fillCircleMargin - waveHeight)])
        .domain([0, 1]);
    var waveAnimateScale = d3.scaleLinear()
        .range([0, waveClipWidth - fillCircleRadius * 2]) // Push the clip area one full wave then snap back.
        .domain([0, 1]);

    // 用于控制仪表内文本位置的比例。
    var textRiseScaleY = d3.scaleLinear()
        .range([fillCircleMargin + fillCircleRadius * 2, (fillCircleMargin + textPixels * 0.7)])
        .domain([0, 1]);
    // Center the gauge within the parent SVG.
    var gaugeGroup = gauge.append('g')
        .attr('transform', 'translate(' + locationX + ',' + locationY + ')');

    // Draw the outer circle.
    var gaugeCircleArc = d3.arc()
        .startAngle(gaugeCircleX(0))
        .endAngle(gaugeCircleX(1))
        .outerRadius(gaugeCircleY(radius))
        .innerRadius(gaugeCircleY(radius - circleThickness));
    gaugeGroup.append('path')
        .attr('d', gaugeCircleArc)
        .style('fill', config.circleColor)
        .attr('transform', 'translate(' + radius + ',' + radius + ')');
    // 与波不重叠的文本
    var text1 = gaugeGroup.append('text')
        .text(textRounder(textStartValue) + percentText)
        .attr('class', 'liquidFillGaugeText')
        .attr('text-anchor', 'middle')
        .attr('font-size', textPixels + 'px')
        .style('fill', config.textColor)
        .attr('transform', 'translate(' + radius + ',' + textRiseScaleY(config.textVertPosition) + ')');

    // 波区域
    var clipArea = d3.area()
        .x(function(d) { return waveScaleX(d.x); })
        .y0(function(d) { return waveScaleY(Math.sin(Math.PI * 2 * config.waveOffset * -1 + Math.PI * 2 * (1 - config.waveCount) + d.y * 2 * Math.PI)); })
        .y1(function(d) { return (fillCircleRadius * 2 + waveHeight); });
    var waveGroup = gaugeGroup.append('defs')
        .append('clipPath')
        .attr('id', 'clipWave' + elementId);
    var wave = waveGroup.append('path')
        .datum(data)
        .attr('d', clipArea)
        .attr('T', 0);
    // 附有波浪的内圈。
    var fillCircleGroup = gaugeGroup.append('g')
        .attr('clip-path', 'url(#clipWave' + elementId + ')');
    fillCircleGroup.append('circle')
        .attr('cx', radius)
        .attr('cy', radius)
        .attr('r', fillCircleRadius)
        .style('fill', config.waveColor);

    // 与波重叠的文本
    var text2 = fillCircleGroup.append('text')
        .text(textRounder(textStartValue) + percentText)
        .attr('class', 'liquidFillGaugeText')
        .attr('text-anchor', 'middle')
        .attr('font-size', textPixels + 'px')
        .style('fill', config.waveTextColor)
        .attr('transform', 'translate(' + radius + ',' + textRiseScaleY(config.textVertPosition) + ')');

    // 让数值增加
    if (config.valueCountUp) {
        var textTween = function() {
            var i = d3.interpolate(this.textContent, textFinalValue);
            var that = this
            return function(t) {
                that.textContent = textRounder(i(t)) + percentText;
             }
        };
        text1.transition()
            .duration(config.waveRiseTime)
            .tween('text', textTween);
        text2.transition()
            .duration(config.waveRiseTime)
            .tween('text', textTween);
    }

    // 使波浪上升。 wave和waveGroup是分开的，因此可以独立控制水平和垂直运动
    var waveGroupXPosition = fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;
    if (config.waveRise) {
        waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(0) + ')')
            .transition()
            .duration(config.waveRiseTime)
            .attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')')
            .on('start', function() { wave.attr('transform', 'translate(1,0)'); })
    } else {
        waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')');
    }

    // 波浪滚动
    if (config.waveAnimate) animateWave();
    function animateWave() {
        wave.attr('transform', 'translate(' + waveAnimateScale(wave.attr('T')) + ',0)');
        wave.transition()
            .duration(config.waveAnimateTime * (1 - wave.attr('T')))
            .ease(d3.easeLinear)
            .attr('transform', 'translate(' + waveAnimateScale(1) + ',0)')
            .attr('T', 1)
            .on('end', function() {
                wave.attr('T', 0);
                animateWave(config.waveAnimateTime);
            });
    }

    // 更新数值
    function update(value) {
        var newFinalValue = parseFloat(value).toFixed(2);
            var textRounderUpdater = function(value) { return Math.round(value); };
            if (parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))) {
                textRounderUpdater = function(value) { return parseFloat(value).toFixed(1); };
            }
            if (parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))) {
                textRounderUpdater = function(value) { return parseFloat(value).toFixed(2); };
            }

            var textTween = function() {
                var i = d3.interpolate(this.textContent, parseFloat(value).toFixed(2));
                var that = this;
                return function(t) { that.textContent = textRounderUpdater(i(t)) + percentText; }
            };

            text1.transition()
                .duration(config.waveRiseTime)
                .tween('text', textTween);
            text2.transition()
                .duration(config.waveRiseTime)
                .tween('text', textTween);

            var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value)) / config.maxValue;
            console.log(fillPercent)
            var waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);
            var waveRiseScale = d3.scaleLinear()
                // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
                // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
                // circle at 100%.
                .range([(fillCircleMargin + fillCircleRadius * 2 + waveHeight), (fillCircleMargin - waveHeight)])
                .domain([0, 1]);
            var newHeight = waveRiseScale(fillPercent);
            var waveScaleX = d3.scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
            var waveScaleY = d3.scaleLinear().range([0, waveHeight]).domain([0, 1]);
            var newClipArea;
            if (config.waveHeightScaling) {
                newClipArea = d3.area()
                    .x(function(d) { return waveScaleX(d.x); })
                    .y0(function(d) { return waveScaleY(Math.sin(Math.PI * 2 * config.waveOffset * -1 + Math.PI * 2 * (1 - config.waveCount) + d.y * 2 * Math.PI)); })
                    .y1(function(d) { return (fillCircleRadius * 2 + waveHeight); });
            } else {
                newClipArea = clipArea;
            }

            var newWavePosition = config.waveAnimate ? waveAnimateScale(1) : 0;
            wave.transition()
                .duration(0)
                .transition()
                .duration(config.waveAnimate ? (config.waveAnimateTime * (1 - wave.attr('T'))) : (config.waveRiseTime))
                .ease(d3.easeLinear)
                .attr('d', newClipArea)
                .attr('transform', 'translate(' + newWavePosition + ',0)')
                .attr('T', '1')
                .on('end', function() {
                    if (config.waveAnimate) {
                        wave.attr('transform', 'translate(' + waveAnimateScale(0) + ',0)');
                        animateWave(config.waveAnimateTime);
                    }
                });
            waveGroup.transition()
                .duration(config.waveRiseTime)
                .attr('transform', 'translate(' + waveGroupXPosition + ',' + newHeight + ')')
    }

    // 创造新的值
    function NewValue() {
        if (Math.random() > 0.5) {
            return Math.round(Math.random() * 100);
        }
        return (Math.random() * 100).toFixed(1);

    }
    // 判断传入的参数
    var isUpdateNew = true
    if (arguments.length > 2) {
        if (arguments.length == 4) {
            isUpdateNew = isUpdate
        } else {
            isUpdateNew = (typeof arguments[2]) == 'object' ? true : arguments[2]
        }
    }

    if (isUpdateNew) {
        gauge.on('click', function() {
            update(NewValue())
        })
    }
}
export default loadLiquidFillGauge
