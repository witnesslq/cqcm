package com.ztesoft.common.util;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;

public class DesEncrypt 
{ 
	
	
	static final char[] hexChars = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
		'A', 'B', 'C', 'D', 'E', 'F' };
	
	static final byte[] desKeyData =
	{(byte)0xF4, (byte)0x88, (byte)0xFD, (byte)0x58,
	 (byte)0x4E, (byte)0x49, (byte)0xDB, (byte)0xCD,
	 (byte)0x20, (byte)0xB4, (byte)0x9D, (byte)0xE4,
	 (byte)0x91, (byte)0x07, (byte)0x36, (byte)0x6B,
	 (byte)0x33, (byte)0x6C, (byte)0x38, (byte)0x0D,
	 (byte)0x45, (byte)0x1D, (byte)0x0F, (byte)0x7C,
	};

	/**
	 * ���ܺ���
	 * @param strPass
	 * @return
	 */
	public String encryptTriDes(String strPass)
	{
		/*
	{'\0xF4','\0x88','\0xFD','\0x58','\0x4E','\0x49','\0xDB','\0xCD'},
	{'\0x20','\0xB4','\0x9D','\0xE4','\0x91','\0x07','\0x36','\0x6B'},
	{'\0x33','\0x6C','\0x38','\0x0D','\0x45','\0x1D','\0x0F','\0x7C'},
		 */
		try
		{
			byte[] pass = strPass.getBytes("UTF-8");
			int tail = pass.length % 8;
			int block = pass.length / 8 + 1;
			byte fill = (byte) (8 - tail);
			byte[] fillPass = new byte[block*8];
			System.arraycopy(pass, 0, fillPass, 0, pass.length);
			for (int i=0;i<8-tail;i++)
				fillPass[pass.length+i] = fill;
//			System.out.println(toHexString(fillPass));

			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DESede");
			DESedeKeySpec desKeySpec = new DESedeKeySpec(desKeyData);
			SecretKey secretKey = keyFactory.generateSecret(desKeySpec);
			Cipher cipher = Cipher.getInstance("DESede");
			cipher.init(Cipher.ENCRYPT_MODE, secretKey);
			
			byte[] result = new byte[block*8];
			for (int i=0; i<block; i++)
			{
				byte[] tmp = cipher.doFinal(fillPass, i*8, 8);				
				System.arraycopy(tmp, 0, result, i*8, 8);
			}
			String strResult = toHexString(result);
			return strResult;
		}catch (Exception e)
		{
			e.printStackTrace(System.err);
			return null;
		}
	}
	
	/**
	 * 
	 * @param strPass
	 * @return
	 */
	public String TriDesDecrypt(String strPass)
	{
		try
		{
			byte[] pass = toByteArray(strPass);
			int block = pass.length / 8;

			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DESede");
			DESedeKeySpec desKeySpec = new DESedeKeySpec(desKeyData);
			SecretKey secretKey = keyFactory.generateSecret(desKeySpec);
			Cipher cipher = Cipher.getInstance("DESede");
			cipher.init(Cipher.DECRYPT_MODE, secretKey);
			
			byte[] result = new byte[block*8];
			for (int i=0; i<block; i++)
			{
				byte[] tmp = cipher.doFinal(pass, i*8, pass.length-i*8);				
				System.arraycopy(tmp, 0, result, i*8, tmp.length);
			}
			int realLen = result.length;
			for (int i=0; i<result.length; i++)
			{
				if (result[i]==0)
				{
					realLen = i;
					break;
				}
			}
			String strResult = new String(result,0,realLen,"UTF-8");
			return strResult;
		}catch (Exception e)
		{
			e.printStackTrace(System.err);
			return null;
		}
	}
	
	
    /*
	 * Converts a byte to hex digit and writes to the supplied buffer
	 */
	private void byte2hex(byte b, StringBuffer buf)
	{
		int high = ((b & 0xf0) >> 4);
		int low = (b & 0x0f);
		buf.append(hexChars[high]);
		buf.append(hexChars[low]);
	}

	/*
	 * Converts a byte array to hex string
	 */
	private String toHexString(byte[] block)
	{
		int len = block.length;
		StringBuffer buf = new StringBuffer(len*2);
		for (int i = 0; i < len; i++)
		{
			byte2hex(block[i], buf);
		}
		return buf.toString();
	}
	
	private byte[] toByteArray(String hexStr)
	{
		int len = hexStr.length()/2;
		byte[] arr = new byte[len];
		for (int i=0; i<len; i++)
		{
			arr[i] = (byte) Integer.parseInt(hexStr.substring(i*2, i*2+2),16);
		}
		return arr;
	}
	
	
	public static void main(String[] args){
		
		
		String pwd ="200111bbb";
		String desPwd ="E6603C43947898BE072E7FC5A3536B2D";
		
		DesEncrypt encrypt = new DesEncrypt();
		
		String jiapwd =encrypt.encryptTriDes(pwd);
		
		String jiePwd = encrypt.TriDesDecrypt(desPwd);
		
		System.out.println("jiapwd=="+jiapwd);
		System.out.println("jiePwd=="+jiePwd);
		
	}

}   



