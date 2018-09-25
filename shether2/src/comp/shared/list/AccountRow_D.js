import React from "react";
//import styles from './list.css';
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Button from "@material-ui/core/Button/Button";
import Link from "react-router-dom/es/Link";

export class AccountRow extends React.Component {
    render() {
            let url = 'https://ropsten.etherscan.io/address/' + this.props.address;
            let style = this.props.hasaction ? {backgroundColor: '#fff5c6'} : undefined;
            let titleBtn = this.props.hasaction ? 'Перейти к фото' : 'Начислить';
            switch (this.props.mode) {
                case 'admin':
                    return (
                        <TableRow style={style}>
                            <TableCell className={'sketch-tbody'}>{this.props.username}</TableCell>
                            <TableCell className={'sketch-tbody'}><a href={url} target={'_blank'}>{this.props.address}</a></TableCell>
                            <TableCell className={'sketch-tbody'} numeric>{this.props.balance}</TableCell>
                            <TableCell className={'sketch-tbody'}>{this.props.created}</TableCell>
                            <TableCell className={'sketch-tbody'}><Button variant="outlined" onClick={() => {this.props.handleReview(this.props);}}>{titleBtn}</Button></TableCell>
                        </TableRow>
                    );
                default:
                    return (
                        <TableRow>
                            <TableCell className={'sketch-tbody'}>{this.props.username}</TableCell>
                            <TableCell className={'sketch-tbody'}><a href={url} target={'_blank'}>{this.props.address}</a></TableCell>
                            <TableCell className={'sketch-tbody'} numeric>{this.props.balance}</TableCell>
                        </TableRow>
                    );
            }
    }
}

