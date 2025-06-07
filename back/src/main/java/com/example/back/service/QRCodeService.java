package com.example.back.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;

@Service
public class QRCodeService {
    public String generateQRCode(long id, String name) {
        String data = "/pages/visit_apply/visit_apply?userId="+ id + "&username=" + name;
//        String data = "http://baidu.com";
//        return data;
        try {
            ByteArrayOutputStream stream = new ByteArrayOutputStream();
            BitMatrix matrix = new MultiFormatWriter().encode(data, BarcodeFormat.QR_CODE, 300, 300);

            MatrixToImageWriter.writeToStream(matrix, "PNG", stream);
            Path path = Files.createTempFile("qrcode", ".png");
            Files.write(path, stream.toByteArray());
            return "data:image/png;base64," + Base64.getEncoder().encodeToString(Files.readAllBytes(path));
        } catch (WriterException e) {
            throw new RuntimeException("访客码创建失败", e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}