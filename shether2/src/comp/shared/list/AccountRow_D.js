import React from "react";
//import styles from './list.css';
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Button from "@material-ui/core/Button/Button";

export class AccountRow extends React.Component {
    render() {
            let style = this.props.hasaction ? {backgroundColor: 'yellow'} : undefined;
            switch (this.props.mode) {
                case 'admin':
                    return (
                        <TableRow style={style}>
                            <TableCell className={'sketch-tbody'}>{this.props.username}</TableCell>
                            <TableCell className={'sketch-tbody'}>{this.props.address}</TableCell>
                            <TableCell className={'sketch-tbody'} numeric>{this.props.balance}</TableCell>
                            <TableCell className={'sketch-tbody'}>{this.props.created}</TableCell>
                            <TableCell className={'sketch-tbody'}>{this.props.hasaction ? <Button variant="outlined" onClick={() => {this.props.handleReview(this.props);}}>Обработать</Button> : undefined }</TableCell>
                        </TableRow>
                    );
                default:
                    return (
                        <TableRow>
                            <TableCell className={'sketch-tbody'}>{this.props.username}</TableCell>
                            <TableCell className={'sketch-tbody'}>{this.props.address}</TableCell>
                            <TableCell className={'sketch-tbody'} numeric>{this.props.balance}</TableCell>
                        </TableRow>
                    );
            }
    }
}

