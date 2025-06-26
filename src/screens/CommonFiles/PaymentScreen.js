import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Linking } from "react-native";
import { createPaymentLink } from "../../api/commonApi/payment";
import { PAYMENT_DETAILS } from "../../constant/PaymentData";

const PaymentScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [paymentLink, setPaymentLink] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await handleGenerateLink();
    };
    fetchData();
  }, []);

  const handleLongPressQr = () => {
    if (paymentLink) {
      Linking.openURL(paymentLink).catch(err => console.error("Error opening UPI App:", err));
    }
  };

  const handleGenerateLink = async () => {
    setLoading(true);
    try {
      const paymentData = {
        upiId: PAYMENT_DETAILS.UPI_ID,
        payeeName: PAYMENT_DETAILS.PAYEE_NAME,
        amount: 10,
        transactionNote: "Maintenance",
        currency: "INR",
      };

      const response = await createPaymentLink(paymentData);
      if (response?.qrCode) {
        let formattedQrCode = response.qrCode;

        if (!formattedQrCode.startsWith("data:image/png;base64,")) {
          formattedQrCode = `data:image/png;base64,${formattedQrCode}`;
        }

        setPaymentLink(response.paymentLink);
        setQrCode(formattedQrCode);
      } else {
        setPaymentLink("No Link Received");
        setQrCode(null);
      }
    } catch (error) {
      console.error("Payment Link Generation Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3B6FD6" />
      ) : qrCode ? (
        <View style={styles.paymentContainer}>
          <Text style={styles.paymentLink}>Scan QR to Pay:</Text>
          <TouchableOpacity onPress={handleLongPressQr}>
          <Image source={{ uri: qrCode }} style={styles.qrImage} />
          </TouchableOpacity>
          <Text style={styles.scanText}>For self-scan, press Scan</Text>
          {paymentLink && (
           <TouchableOpacity onPress={() => Linking.openURL(paymentLink)}>
              <Text style={styles.paymentLinkText}>{paymentLink}</Text>
           </TouchableOpacity>
          )}
        </View>
      ) : (
        <Text style={styles.noQrText}>No QR Code Available...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paymentContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  paymentLink: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color:"black"
  },
  qrImage: {
    width: 300,
    height: 300,
  },
  paymentText: {
    fontSize: 16,
    color: "green",
    marginTop: 10,
  },
  noQrText: {
    fontSize: 14,
    color: "red",
    marginTop: 10,
  },
  paymentLinkText: {
    fontSize: 12,
    color: '#3B6FD6',
    textDecorationLine: 'underline',
    marginTop: 8,
    textAlign: 'center',
  },
  qrSection: {
    alignItems: 'center',
  },
  scanText: {
    fontSize: 14,
    marginTop: 10,
    color: '#666',
  },
});

export default PaymentScreen;
