import React from 'react';
import { Input, Button, Upload , message} from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import type { Shape } from '../types';

interface HeaderProps{
    title : string;
    onTitleChange: (newTitle:string) => void;
    shapes : Shape[];
    onImport : (data: { title: string; shapes: Shape[] }) => void;
}



const Header : React.FC<HeaderProps> = ({
    title,
    onTitleChange,
    shapes,
    onImport
}) => {

    const handleExport = () =>{
        const data = {title , shapes};
        const jsonData = JSON.stringify(data , null , 2);
        const blob = new Blob([jsonData] , { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url ; 
        link.download = 'shapes.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }


    const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        if (
          typeof parsed.title === 'string' &&
          Array.isArray(parsed.shapes)
        ) {
          onImport(parsed);
        } else {
          throw new Error();
        }
      } catch {
        message.error('Invalid JSON format');
      }
    };
    reader.readAsText(file);
    return false;
  };

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
                beforeUpload={handleImport}
            >
                <Button icon={<UploadOutlined />}>Import</Button>
            </Upload>

            <Button
                icon={<DownloadOutlined />}
                onClick={handleExport}
            >
                Export
            </Button>
        </div>
    );
}

export default Header;