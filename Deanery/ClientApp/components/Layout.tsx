import * as React from 'react';
import { NavMenu } from './NavMenu';
import { Logout } from './Logout'

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-2'>
                    <NavMenu />
                </div>
                <div className='col-sm-8 contentMenu'>
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}
