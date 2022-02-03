package com.great_team.projects.vol.util;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class VolRefGenerator implements IdentifierGenerator  {

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
	    try {
	    	Connection connection = session.connection();
	        Statement statement=connection.createStatement();

	        ResultSet rs=statement.executeQuery("select count(ref_vol) as tot from vol");

	        if(rs.next())
	        {
	            Long id= 2*rs.getLong(1)+19900;
	            String generatedId = Long.toHexString(id).toUpperCase();
	            return generatedId;
	        }
	    } catch (SQLException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    }
		return null;
	}

}
