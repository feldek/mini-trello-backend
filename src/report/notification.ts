import { Response } from "express";

export const notification = async (
  res: Response,
  {
    status = false,
    message = "",
    description = "",
  }: { status: boolean; message: string; description?: string },
): Promise<void> => {
  try {
    let header: string;
    let colorHeader: string;

    if (status) {
      header = "The operation was successful";
      colorHeader = "#690";
    } else {
      header = "ERROR";
      colorHeader = "#fb3e44";
    }

    const backgroundStyle = ` 
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(241, 241, 241, 0.521);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
      "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    `;

    const backgrounNotificationStyle = `
      min-width: 300px;
      max-width: 600px;
      padding: 20px;      
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: relative;
      top: -80px;
      background-color: white;
      outline: 1px solid #ebedee;
      outline-offset: -10px;
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
      border-radius: 2px;
    `;
    const headerStyle = `
      color: ${colorHeader};
      font-size: 22px;
      padding: 10px;
    `;

    const messageStyle = `
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 10px;`;
    const descriptionStyle = `
      font-size: 14px;
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 10px;`;
    const html = `
    <div style = '${backgroundStyle}'>
      <dvs style = '${backgrounNotificationStyle}'>
        <div style = '${headerStyle}'>
          ${header}
          </div>
        <div style = '${messageStyle}'>
          ${message}
        </div>
        <div style = '${descriptionStyle}'>
          ${description}
        </div>
      </dvs>
    </div>
    `;
    res.send(html);
  } catch (e) {
    console.log(e);
    res.status(500).json({});
  }
};
