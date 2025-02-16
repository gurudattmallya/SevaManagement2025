// utils/firebase-admin.js
import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Firebase Admin
const serviceAccount = {
    "type": "service_account",
    "project_id": "otp-project-c5765",
    "private_key_id": "12bc296ac4bb1cc9400cd3c1c9448ae9d45c79bd",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQClfdY6OktSSwxv\n7tXYaoojnl83amkLBCHzeeFns2Zixi3KsDyJkWoHU5JcHzDkRmRzpcME+zTvDnhQ\nFuQdHDEoR2qNcMWV6wfZhRMFtnuTMeuTUSDwa26vgAjqsAJ5msj01FtlzgA+gzCi\n0LY6bXeQLqe2EYOKCnnQhKuxe0k/K20Fg0PRqyMa4n2NG5txfQbJf1zOwVL7ZlMu\naCDHR1HhyZKX1V9lTNADZFRRAZ0fEAaUuQwoJplg9gTk5PPHKlCxhLRgrvNS8ExA\nT5MqkeqpD1i+opfaL8OXeIRV88JXcqd6XajTRO6/8G3g4w4+yRaJ0m9GGpWSo1Ul\nCszLWb/hAgMBAAECggEAA2YJ1wOeWXxoZ/q8AGurQQZzfCNM99bWOIu2yBqGEd5V\nlqHpBT8dlYoLft5hHTfnFVJAtO1e33ph0Xs9+gm7n19ciLbZnUQBmgpQzc2QWwFk\nqo+ATAF1QFjAq3WdqvOnXfYEQg0UMjR0nyGVCOeyYeRqgKN6U72Ecj2ztBDUNQjd\n0Skpx63RS0MbQ4ONHWVDFb4lnDGP7JpLAnStaqrY0+f6tcIsKHLz6L2gG6/IrKb8\nGkWN24LJPR8hkZFcWfFc5yGt+4huYxgWo41mO6rYTql0YhE3NKtmZsGObU7e09/Z\nI3iLAtaBCjmEDWf5LvTAt4BxxjkC+FQtuhv5ygTNsQKBgQDP87k9PdwxNAwHEHG3\ncO+q2h/6u67Gv8ZcgWZwxFPQ6ZMxbBJn5OwWXkUizPbUsrFLfMUlijLRzuJgv0Dm\nNu+LXTc1T0vq38ts8IB6fvDkO/FTycX4xGwvivpSVAvLJs+JTYzHv1hkAlhQApeh\nc5PBeP+jVq9HfwFxKc48YKoqlQKBgQDLupe8vjIiKEcoG8xIjFjwbIHOo9+HPCd3\nTgZsvSL7o0oF4Nd2Oz9e2MybrXGTMAMIi1kWqgDTJg1hhoizDP9e1uheOh5XLk27\nxM0hIfH5cBmoObr3R3vFhAP7p5W6LnVm4TydZY1rIgurL+59rCHCvyagUFxY9aK5\nrdtjAAj5HQKBgQCp/VzukBPgcOBoIewjfYGdk4NSznt34qq/UdQw2Hx/qYB2hRai\nsULAoj03zn7zrkM6JvttzYPveIQbfBwMVNoKfZ+0x2aS0HCVVCBigkRe/hUvXiCk\nU8TwNFaeWC/v2IEMh0VOv778ueIBPa1AAJ/HJycqGaFc+5htLjR1rLtN5QKBgHna\ntm13GYdirgToc4ylHYFYdV/Clq1NppFugttBWY5Hgbv4WwdlsqapZ+BpongWDIps\nxrGOp4WjyfceP99Qk+IHCt9pRcKBeI8pzEPYCOJYUZBUT2ceQ4LFTpiUCTNeHGyX\npejC2A5PQ8l1luFmNp9EM/dJeaLf8R+8RG93kuZlAoGBAIh6R8TNFA3+9io4TK16\no3KOwYAi5FlBmwWaDy4rVLwUeEyGE8zUD8zqkCYZoM0XfjpxFv2m6nbTlNTIE+uw\no6qAQlK/0OBo0xAZJv8VrJT55LQMEqxsl4Cb2Eefe2SZX2pmWIIzEKMrG3XtNj/I\nRfjdw5ToAcfxdreotQlarokG\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-3swlc@otp-project-c5765.iam.gserviceaccount.com",
    "client_id": "112026411963493991002",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3swlc%40otp-project-c5765.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
};

// Initialize Firebase Admin if it hasn't been initialized yet
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export const auth = admin.auth();