import React from 'react';
import { Alert } from '@bsf/force-ui';

const Settings = () => {
    return (
        <div className="flex gap-3 items-center justify-start flex-wrap m-4 p-4">
            <Alert title={"Info alert"} content={"This is a description"} variant="error" />
            <Alert title={"Info alert"} content={"This is a description"} variant="warning" />
            <Alert title={"Info alert"} content={"This is a description"} variant="success" />
            <Alert title={"Info alert"} content={"This is a description"} design={"stack"} variant="info" action={
                            {label: 'Undo',
                            onClick: () => {},
                            type: 'button',
                        }} />
            <Alert title={"Info alert"} content={"This is a description"} variant="neutral" />
            <Alert title={"Info alert"} content={"This is a description"} theme={"dark"} variant="error" />
            <Alert title={"Info alert"} content={"This is a description"} theme={"dark"} variant="warning" />
            <Alert title={"Info alert"} content={"This is a description"} theme={"dark"} variant="success" />
            <Alert title={"Info alert"} content={"This is a description"} theme={"dark"} variant="info" />
            <Alert title={"Info alert"} content={"This is a description"} theme={"dark"} variant="neutral" />
        </div>
    );
};

export default Settings;