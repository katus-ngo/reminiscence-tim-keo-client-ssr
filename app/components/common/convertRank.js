import React from 'react';
import PropTypes from "prop-types";
class ConvertRank extends React.Component{
    render() {
        const { gameId, rankNumber, title} = this.props;
        let rank;
        if(gameId === 1) {
            if(rankNumber>=0 && rankNumber<0.15){
                rank = 'Sắt';
            } else if (rankNumber<1.5) {
                rank = 'Đồng'
            } else if (rankNumber<2.5) {
                rank = 'Bạc'
            } else if (rankNumber<3.5) {
                rank = 'Vàng'
            } else if (rankNumber<4.5) {
                rank = 'Bạch kim'
            } else if (rankNumber<5.5) {
                rank = 'Kim cương'
            } else if (rankNumber<6.5) {
                rank = 'Cao thủ'
            } else {
                rank = 'Thách đấu'
            }
        }
        if(gameId === 2) {
            if(rankNumber>=0 && rankNumber<0.15){
                rank = 'Nghiệp dư';
            } else if (rankNumber<1.5) {
                rank = 'Bán chuyên'
            } else if (rankNumber<2.5) {
                rank = 'Chuyên nghiệp'
            } else if (rankNumber<3.5) {
                rank = 'Thế giới'
            } else if (rankNumber<4.5) {
                rank = 'Huyền thoại'
            } else if (rankNumber<5.5) {
                rank = 'Thách đấu'
            } else {
                rank = 'Siêu sao'
            }
        }
        if(gameId === 3) {
            if(rankNumber>=0 && rankNumber<0.15){
                rank = 'Nghiệp dư';
            } else if (rankNumber<1.5) {
                rank = 'Bán chuyên'
            } else if (rankNumber<2.5) {
                rank = 'Chuyên nghiệp'
            } else if (rankNumber<3.5) {
                rank = 'Thế giới'
            } else if (rankNumber<4.5) {
                rank = 'Huyền thoại'
            } else if (rankNumber<5.5) {
                rank = 'Thách đấu'
            } else {
                rank = 'Siêu sao'
            }
        }
        return (
            <span>{title}: {rank}</span>
        )
    }
}
ConvertRank.propTypes = {
    gameId: PropTypes.number,
    rankNumber: PropTypes.number,
    title: PropTypes.string
}
export default ConvertRank;