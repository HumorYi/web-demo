package com.chinasofti.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class JDBCTest {
	
	private static String jdbcName = "com.mysql.jdbc.Driver";
	private static String dbUrl = "jdbc:mysql://localhost:3306/db_student";
	private static String dbName = "root";
	private static String dbpassword = "123456";
	public static void main(String[] args) {
	
		// TODO Auto-generated method stub
		try {
			Class.forName(jdbcName);//ͨ���÷�������jdbc����
			System.out.println("���ݿ��������سɹ�");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("���ݿ���������ʧ��");
		} 
	/**
	 *  url a database url of the form jdbc:subprotocol:subname
		user the database user on whose behalf the connection is being made
		password the user's password

	 */
		Connection connection = null;
		try {
			connection = DriverManager.getConnection(dbUrl, dbName, dbpassword);
			System.out.println("���ݿ����ӳɹ�");
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("���ݿ�����ʧ��");
		}finally{
			try {
				connection.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

}
