import React from "react";
//import styles from './list.css';
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";

export class AccountRow extends React.Component {
    render() {
            switch (this.props.mode) {
                case 'admin':
                    return (
                        <TableRow>
                            <TableCell className={'sketch-tbody'}>{this.props.username}</TableCell>
                            <TableCell className={'sketch-tbody'}>{this.props.address}</TableCell>
                            <TableCell className={'sketch-tbody'} numeric>{this.props.balance}</TableCell>
                            <TableCell className={'sketch-tbody'}>{this.props.created}</TableCell>
                        </TableRow>
                    );
                default:
                    return (
                        <TableRow>
                            <TableCell className={'sketch-tbody'}>{'***' + this.props.username.substr(this.props.username.length - 4)}</TableCell>
                            <TableCell className={'sketch-tbody'}>{this.props.address}</TableCell>
                            <TableCell className={'sketch-tbody'} numeric>{this.props.balance}</TableCell>
                        </TableRow>
                    );
            }
    }
}

