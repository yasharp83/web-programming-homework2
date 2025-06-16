import React from 'react';
import { Input, Button, Upload} from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';

interface HeaderProps{
    title : string;
    onTitleChange: (newTitle:string) => void;
}



const Header : React.FC<HeaderProps> = ({
    title,
    onTitleChange
}) => {
    return(
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
            <Input
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                style={{ maxWidth: 300 }}
            />

            <Upload
                accept=".json"
                showUploadList={false}
            >
                <Button icon={<UploadOutlined />}>Import</Button>
            </Upload>

            <Button
                icon={<DownloadOutlined />}
            >
                Export
            </Button>
        </div>
    );
}

export default Header;